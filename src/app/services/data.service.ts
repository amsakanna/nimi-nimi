import { Injectable } from '@angular/core';
import { AngularFireModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Query } from 'angularfire2/interfaces';
import { Observable } from 'rxjs';
import { FILTER, SORT, DATABASE_OPERATION, STATUS, ERROR } from '../app.enum';
import { DataServiceObject } from '../models/data-service-object.model';
import { Error } from '../models/error.model';

@Injectable()
export abstract class DataService<T> {

	/*-----------------------------------------------------------------------
	VARIABLE-SECTION
	-----------------------------------------------------------------------*/

	private table: FirebaseListObservable<any[]>;
	private dataServiceObject: DataServiceObject;
	protected abstract tableName: string;
	protected abstract foreignKeyName: string;
	protected abstract searchKeyName: string;
	protected abstract createModel(json: any): T;
	protected mapModelToObject(item: T): any
	{
		return item;
	}

	/*-----------------------------------------------------------------------
		CRUD
	-----------------------------------------------------------------------*/

	constructor(protected db: AngularFireDatabase, tableName: string)
	{		
		this.tableName = tableName;
		this.table = this.db.list(this.tableName);
		this.dataServiceObject = new DataServiceObject({operation: null, object: null});
	}

	setTable(tableName: string)	{
		this.tableName = tableName;
		this.table = this.db.list(this.tableName);
	}

	insert(object: any) : DataServiceObject
	{
		this.dataServiceObject = new DataServiceObject({operation: DATABASE_OPERATION.INSERT, object: object});
		this.dataServiceObject.object.$key = this.table.push(this.dataServiceObject.objectWithoutKey).key;
		return this.dataServiceObject;
	}

	delete(object: any) : DataServiceObject
	{
		this.dataServiceObject = new DataServiceObject({operation: DATABASE_OPERATION.DELETE, object: object});
		if(this.isValidKey(this.dataServiceObject.object.$key))
		{
			this.table.remove(this.dataServiceObject.object.$key)
				.then(data => this.dataServiceObject.status = STATUS.SUCCESS )
				.catch(error => {
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
		return this.dataServiceObject;
	}

	update(object: any) : DataServiceObject
	{
		this.dataServiceObject = new DataServiceObject({operation: DATABASE_OPERATION.UPDATE, object: object});
		if(this.isValidKey(this.dataServiceObject.object.$key))
		{
			delete this.dataServiceObject.objectWithoutKey.product;
			console.log(this.dataServiceObject.object.$key);
			console.log(this.dataServiceObject.objectWithoutKey);
			this.table.update(this.dataServiceObject.object.$key, this.dataServiceObject.objectWithoutKey)
				.then(data => this.dataServiceObject.status = STATUS.SUCCESS )
				.catch(error => {
					this.dataServiceObject.status = STATUS.FAILURE;
					this.dataServiceObject.error = new Error({
						code: ERROR.UPDATE_FAILED,
						message: error.message, 
						reason: 'Server error', 
						solution: 'Check console log',
						details: error.stack
					});
				});
		}		
		return this.dataServiceObject;
	}

	upsert(object: any) : DataServiceObject
	{
		if(this.isValidKey(this.dataServiceObject.object.$key))
			this.update(object);
		else
			this.insert(object);
		return this.dataServiceObject;
	}

	exists(key: string) : Observable<boolean> 
	{
		if(this.isValidKey(key)) {
			const dataStream = this.db.object(this.tableName + "/" + key);
			return dataStream.take(1).count().map(count => count > 0);
		} else {
			return Observable.of(false);
		}
	}

	getObject(key: string): Observable<T> 
	{
		const dataStream = this.db.object(this.tableName + "/" + key);
		return this.mapObjectToModel(dataStream);
	}

	getList(sortBy: SORT, filterBy: FILTER, filterValue?: string) : Observable<T[]>
	{
		var query = this.prepareQuery(sortBy, filterBy, filterValue);
		const dataStream = this.db.list(this.tableName, { query: query });
		return this.mapListToModel(dataStream);
	}

	/*-----------------------------------------------------------------------
		CRUD HELPERS
	-----------------------------------------------------------------------*/

	private isValidKey(key: string) 
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

	private prepareQuery(sortBy: SORT, filterBy: FILTER, filterValue?: string) : Query
	{

		var query: Query = {};

		switch (sortBy)
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
				break;
		} 

		switch (filterBy) 
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

	private mapListToModel(dataStream : Observable<any[]>) 
	{
		return dataStream.map(list => {			
			return list.map(object => this.createModel(object));
		});
	}

	private mapObjectToModel(dataStream : Observable<any>) 
	{
		return dataStream.map(object => this.createModel(object));
	}

	/*-----------------------------------------------------------------------
		FEATURES
	-----------------------------------------------------------------------*/

}
