import { Injectable } from '@angular/core';
import { AngularFireModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Query } from 'angularfire2/interfaces';
import { Observable } from 'rxjs';
import { FILTER, SORT, DATABASE_OPERATION, STATUS, ERROR } from '../app.enum';
import { DataServiceObject } from '../models/data-service-object.model';
import { Error } from '../models/error.model';

@Injectable()
export abstract class DataService<T>
{

	/*-----------------------------------------------------------------------
		VARIABLE-SECTION
	-----------------------------------------------------------------------*/

	private table: FirebaseListObservable<any[]>;
	private dataServiceObject: DataServiceObject;
	protected tableName: string;
	protected foreignKeyName: string;
	protected searchKeyName: string;
	protected abstract createModel(json: any): T;
	protected mapModelToObject(item: T): any
	{
		return item;
	}

	private serviceList = {
		AddressService: {
			tableName: 'Address',
			foreignKeyName: 'userKey',
			searchKeyName: 'streetAddress'
		},
		UserService: {
			tableName: 'User',
			foreignKeyName: null,
			searchKeyName: 'email'
		},
		DepartmentService: {
			tableName: 'Department',
			foreignKeyName: null,
			searchKeyName: 'id'
		},
		CardService: {
			tableName: 'Card',
			foreignKeyName: 'userKey',
			searchKeyName: 'holderName'
		},
		ProductService: {
			tableName: 'Product',
			foreignKeyName: null,
			searchKeyName: 'name'
		},
		BrandService: {
			tableName: 'Brand',
			foreignKeyName: null,
			searchKeyName: 'name'
		},
		InventoryService: {
			tableName: 'Inventory',
			foreignKeyName: null,
			searchKeyName: 'id'
		},
		JournalService: {
			tableName: 'Journal',
			foreignKeyName: null,
			searchKeyName: 'id'
		},
		AccountService: {
			tableName: 'Account',
			foreignKeyName: null,
			searchKeyName: 'id'
		},
		WishListService: {
			tableName: 'WishList',
			foreignKeyName: 'userKey',
			searchKeyName: 'name'
		},
		TagService: {
			tableName: 'Tag',
			foreignKeyName: '',
			searchKeyName: 'name'
		},
		PictureService: {
			tableName: 'Picture',
			foreignKeyName: '',
			searchKeyName: 'name'
		},
		IndexService: {
			tableName: 'Index',
			foreignKeyName: '',
			searchKeyName: ''
		},
		ColorService: {
			tableName: 'Color',
			foreignKeyName: '',
			searchKeyName: 'name'
		},
		SizeService: {
			tableName: 'Size',
			foreignKeyName: '',
			searchKeyName: 'code'
		},
		CartItemService: {
			tableName: 'CartItem',
			foreignKeyName: 'userKey',
			searchKeyName: 'sequence'
		},
		DefaultService: {
			tableName: 'Default'
		},
		NavigationItemService: {
			tableName: 'Interface/Navigation/NavigationItem',
			foreignKeyName: '',
			searchKeyName: 'link'
		},
		TileSizeService: {
			tableName: 'Interface/TileSize',
			foreignKeyName: '',
			searchKeyName: ''
		}
	}
    
	/*-----------------------------------------------------------------------
		CRUD
	-----------------------------------------------------------------------*/

	constructor( protected db?: AngularFireDatabase )
	{	
		var serviceName = this.constructor.name;
		if( this.serviceList[serviceName] )
		{
			var service = this.serviceList[serviceName];
			this.tableName = service.tableName;
			this.foreignKeyName = service.foreignKeyName;
			this.searchKeyName = service.searchKeyName;
		}
		if( this.tableName )
			this.table = this.db.list( this.tableName );
		this.dataServiceObject = new DataServiceObject( { operation: null, object: null } );
	}

	getTable() : FirebaseListObservable<any[]>
	{
		return this.table;
	}

	setTable( tableName: string ) : FirebaseListObservable<any[]>
	{
		this.tableName = tableName;
		this.table = this.db.list( this.tableName );
		return this.table;
	}

	insert(object: any) : DataServiceObject
	{
		this.dataServiceObject = new DataServiceObject({operation: DATABASE_OPERATION.INSERT, object: object});
		this.dataServiceObject.object.$key = this.table.push(this.dataServiceObject.objectWithoutKey).key;
		return this.dataServiceObject;
	}

	delete(object: any) : firebase.Promise<any>
	{
		this.dataServiceObject = new DataServiceObject({operation: DATABASE_OPERATION.DELETE, object: object});
		if( ! this.isValidKey(this.dataServiceObject.object.$key))
			return null;
		return this.table.remove( this.dataServiceObject.object.$key )
			.then( data => this.dataServiceObject.status = STATUS.SUCCESS )
			.catch( error => {
				this.dataServiceObject.status = STATUS.FAILURE;
				this.dataServiceObject.error = new Error({
					code: ERROR.DELETE_FAILED,
					message: error.message, 
					reason: 'Server error', 
					solution: 'Check console log',
					details: error.stack
				});
			});
	}

	update(object: any) : DataServiceObject
	{
		this.dataServiceObject = new DataServiceObject({operation: DATABASE_OPERATION.UPDATE, object: object});
		if( ! this.isValidKey(this.dataServiceObject.object.$key) )
			return null;
		this.table.update(this.dataServiceObject.object.$key, this.dataServiceObject.objectWithoutKey)
			.then( data => this.dataServiceObject.status = STATUS.SUCCESS )
			.catch( error => {
				this.dataServiceObject.status = STATUS.FAILURE;
				this.dataServiceObject.error = new Error({
					code: ERROR.UPDATE_FAILED,
					message: error.message, 
					reason: 'Server error', 
					solution: 'Check console log',
					details: error.stack
				});
			});
		return this.dataServiceObject;
	}

	upsert(object: any, lookupValue: string, lookupColumn?: string) : Observable<DataServiceObject>
	{

		Object.keys( object ).forEach( key => {
			object[key] = object[key] ? object[key] : '';
		});

		this.dataServiceObject = new DataServiceObject({
			operation: DATABASE_OPERATION.NONE,
			object: object
		});

		return this
		.lookup( lookupValue, lookupColumn )
		.map( data => {
			if( data ) {
				this.dataServiceObject.oldObject = data;
				this.dataServiceObject.object.$key = this.dataServiceObject.oldObject.$key;
				return this.update( this.dataServiceObject.object );
			} else {
				return this.insert( this.dataServiceObject.object );
			}
		});
		
	}

	insertIfNew(object: any, lookupValue: string, lookupColumn?: string) : Observable<DataServiceObject>
	{
		this.dataServiceObject = new DataServiceObject({
			operation: DATABASE_OPERATION.NONE,
			object: object
		});


		return this
		.lookup( lookupValue, lookupColumn )
		.map( data => {
			this.dataServiceObject.object = data;
			if( ! data && this.dataServiceObject.status != STATUS.FAILURE )
				this.insert( this.dataServiceObject.object );
			return this.dataServiceObject;
		});

	}

	lookup( lookupValue: string, lookupColumn?: string ) : Observable<T> 
	{
		var dataStream;
		if( ! this.isValidKey( lookupValue ) ) {
			return Observable.of( undefined );
		}
		if( ! lookupColumn ) {
			return this.getObject( lookupValue );
		} else {	
			return this
			.getList( lookupColumn, FILTER.EQUAL_TO, lookupValue )
			.take( 1 )
			.map( list => list[0] );
		}
	}

	getObject( key: string ): Observable<T> 
	{
		const dataStream = this.db.object(this.tableName + '/' + key ).take( 1 );
		return this.mapObjectToModel( dataStream );
	}

	getList( sortBy: SORT | string, filterBy: FILTER, filterValue?: string ) : Observable<T[]>
	{
		var query = this.prepareQuery( sortBy, filterBy, filterValue );
		const dataStream = this.db.list( this.tableName, { query: query } ).take( 1 );
		return this.mapListToModel( dataStream );
	}

	/*-----------------------------------------------------------------------
		CRUD HELPERS
	-----------------------------------------------------------------------*/

	isValidKey(key: string) : boolean
	{
		if(key !== undefined && key !== null && key !== '') {
			this.dataServiceObject.isValidKey = true;
			this.dataServiceObject.status = STATUS.SUCCESS;
			return true;
		} else {
			this.dataServiceObject.isValidKey = false;
			this.dataServiceObject.status = STATUS.FAILURE;
			this.dataServiceObject.error = new Error({code: ERROR.KEY_IS_EMPTY, message: 'Key is empty', reason: 'Key not provided', solution: 'Provide a key', details: ''});
			return false;
		}
	}

	private prepareQuery(sortBy: SORT | string, filterBy: FILTER, filterValue?: string) : Query
	{

		var query: Query = {};

		switch ( sortBy )
		{
			case SORT.KEY:
				query.orderByKey = true;
				break;
			case SORT.VALUE:
				query.orderByValue = true;
				break;
			case SORT.FOREIGN_KEY:
				query.orderByChild = this.foreignKeyName;				
				break; 
			case SORT.SEARCH_KEY:
				query.orderByChild = this.searchKeyName;
				break;
			default:
				query.orderByChild = <string>sortBy;
				break;
		} 

		switch ( filterBy ) 
		{
			case FILTER.EQUAL_TO: 
				query.equalTo = filterValue;
				break; 
			case FILTER.BEGINS_WITH:
				query.startAt = filterValue;
				var firstPart = (filterValue.length == 1) ? "" : filterValue.substr(0, filterValue.length - 1);	
				var lastPart = String.fromCharCode(filterValue.charCodeAt(filterValue.length-1) + 1);
				query.endAt = firstPart + lastPart;
				break;
			default: 
				break;
		}

		return query;

	}

	/*-----------------------------------------------------------------------
		MAP TO MODEL
	-----------------------------------------------------------------------*/

	private mapListToModel( dataStream : Observable<any[]> ) 
	{
		return dataStream.map( list =>
			list.map( object => this.createModel( object ) )
		);
	}

	private mapObjectToModel( dataStream : Observable<any> ) 
	{
		return dataStream.map( object => this.createModel( object ) );
	}

	/*-----------------------------------------------------------------------
		FEATURES
	-----------------------------------------------------------------------*/

}
