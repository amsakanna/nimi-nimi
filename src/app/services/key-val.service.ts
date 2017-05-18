import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { KeyVal } from '../models/key-val.model';

@Injectable()
export class KeyValService extends DataService {

	protected createModel = (json) => new KeyVal(json, this.tableName);
	protected foreignKeyName = null;
	protected searchKeyName = "key";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "dummy");
	}

	setTable(tableName: string) {
		super.setTable(tableName);
	}

}
