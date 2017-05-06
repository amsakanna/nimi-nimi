import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Query } from 'angularfire2/interfaces';
import { Observable } from 'rxjs';
import { FILTER, SORT } from '../models/constants';

@Injectable()
export abstract class DataService {

	/*-----------------------------------------------------------------------
	VARIABLE-SECTION
	-----------------------------------------------------------------------*/

	protected abstract foreignKeyName: string;
	protected abstract searchKeyName: string;
	protected abstract createModel;
	protected query: Query;
	private dataStream: FirebaseListObservable<any[]>;
	private readonly tableName: string;

	/*-----------------------------------------------------------------------
		CRUD
	-----------------------------------------------------------------------*/

	constructor(protected db: AngularFireDatabase, tableName: string)
	{
		this.tableName = tableName;
		this.dataStream = this.db.list(this.tableName);		
	}

	getObject(key: string): Observable<any> 
	{
		const dataStream = this.db.object(this.tableName + '/' + key);
		return this.mapObjectToModel(dataStream);
	}

	getList(filterBy: FILTER, sortBy: SORT, filterValue?: string) : Observable<any[]>
	{

		this.query = {};

		switch (sortBy)
		{
			case SORT.KEY:
				this.query.orderByKey = true;
				break;
			case SORT.VALUE:
				this.query.orderByValue = true;
				break;
			case SORT.FOREIGN_KEY:
				this.query.orderByChild = this.foreignKeyName;				
				break; 
			case SORT.SEARCH_KEY:
				this.query.orderByChild = this.searchKeyName;
				break;
			default: 
				break;
		} 

		switch (filterBy) 
		{
			case FILTER.FOREIGN_KEY: 
				this.query.equalTo = filterValue;
				break; 
			case FILTER.BEGINS_WITH:
				this.query.startAt = filterValue;
				var firstPart = (filterValue.length == 1) ? "" : filterValue.substr(0, filterValue.length - 1);	
				var lastPart = String.fromCharCode(filterValue.charCodeAt(filterValue.length-1) + 1);
				this.query.endAt = firstPart + lastPart;
				break;
			default: 
				break;
		}
		
		const dataStream = this.db.list(this.tableName, { query: this.query });
		return this.mapListToModel(dataStream);

	}

	add(object: any) : any 
	{
		delete object.$key;
		const key = this.dataStream.push(object).key;
		return key;
	}

	remove(object: any)
	{
		this.dataStream.remove(object.$key);
	}

	addIndices(object: any) : any
	{
		const BeginsWithWordIndexStream = this.db.list('indices/beginsWith');
		return BeginsWithWordIndexStream;
	}

	removeIndices() : any
	{

	}

	/*-----------------------------------------------------------------------
		MAP TO MODEL
	-----------------------------------------------------------------------*/

	mapListToModel(dataStream : Observable<any[]>) 
	{
		return dataStream.map(list => {			
			return list.map(object => this.createModel(object) );
		});
	}

	mapObjectToModel(dataStream : Observable<any>) 
	{			
		return dataStream.map(object => this.createModel(object) );
	}


	/*-----------------------------------------------------------------------
		FEATURES
	-----------------------------------------------------------------------*/

}
