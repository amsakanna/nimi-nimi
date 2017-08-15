import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Index } from '../models/index.model';

@Injectable()
export class IndexService extends DataService<any> 
{ 
	constructor(db: AngularFireDatabase) 
	{
		super(db); 
	} 
	protected createModel(json) : Index[]
	{ 
		return; 
	} 
}