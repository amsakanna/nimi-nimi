import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Journal } from '../models/journal.model';

@Injectable()
export class JournalService extends DataService {

	protected createModel = (json) => new Journal(json);
	protected foreignKeyName = null;
	protected searchKeyName = "transactionAmount";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "journals");
	}

}
