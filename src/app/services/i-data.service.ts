import { AngularFireModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Query } from 'angularfire2/interfaces';
import { Observable } from 'rxjs';
import { FILTER, SORT, DATABASE_OPERATION, STATUS, ERROR } from '../app.enum';
import { DataServiceObject } from '../models/data-service-object.model';
import { Error } from '../models/error.model';

export interface IDataService
{

	setTable(tableName: string) : FirebaseListObservable<any[]>;
	insert(object: any) : DataServiceObject;
	delete(object: any) : DataServiceObject;
	update(object: any) : DataServiceObject;
	upsert(object: any) : DataServiceObject;
	exists(key: string) : Observable<boolean>;

}
