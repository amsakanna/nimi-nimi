import { Injectable } from '@angular/core';
import { AngularFireModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Query } from 'angularfire2/interfaces';
import { Observable } from 'rxjs';
import { FILTER, SORT } from '../models/constants';

@Injectable()
export abstract class DataService {

	/*-----------------------------------------------------------------------
	VARIABLE-SECTION
	-----------------------------------------------------------------------*/

	private table: FirebaseListObservable<any[]>;
	protected abstract tableName: string;
	protected abstract foreignKeyName: string;
	protected abstract searchKeyName: string;
	protected abstract createModel;

	/*-----------------------------------------------------------------------
		CRUD
	-----------------------------------------------------------------------*/

	constructor(protected db: AngularFireDatabase, tableName: string)
	{
		this.tableName = tableName;
		this.table = this.db.list(this.tableName);
	}

	setTable(tableName: string)	{
		this.tableName = tableName;
		this.table = this.db.list(this.tableName);
	}

	add(object: any) : any 
	{
		delete object.$key;
		const key = this.table.push(object).key;
		return key;
	}

	remove(object: any)
	{
		if(object.$key !== '' && object.$key !== null && object.$key !== undefined)
			this.table.remove(object.$key);
	}

	update(object: any) : any
	{
		var key = object.$key;
		delete object.$key;
		if(key == '')
			key = this.table.push(object).key;
		else
			this.table.update(key, object);		
		return key;
	}

	getObject(key: string): Observable<any> 
	{
		const dataStream = this.db.object(this.tableName + "/" + key);
		return this.mapObjectToModel(dataStream);
	}

	getList(sortBy: SORT, filterBy: FILTER, filterValue?: string) : Observable<any[]>
	{
		var query = this.prepareQuery(sortBy, filterBy, filterValue);
		const dataStream = this.db.list(this.tableName, { query: query });
		return this.mapListToModel(dataStream);
	}

	/*-----------------------------------------------------------------------
		CRUD HELPERS
	-----------------------------------------------------------------------*/

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
