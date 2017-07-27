import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { DataService } from '../services/data.service';
import { KeyVal } from '../models/key-val.model';

@Injectable()
export class KeyValService extends DataService<KeyVal> {

	protected foreignKeyName = null;
	protected searchKeyName = "key";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "dummy");
	}

	setTable(tableName: string) : FirebaseListObservable<any[]> {
		return super.setTable(tableName);
	}

	protected createModel(json): KeyVal {
		return new KeyVal(json, this.tableName);
	}

}
