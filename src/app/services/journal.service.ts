import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Journal } from '../models/journal.model';
import { Account } from '../models/account.model';
import { DataServiceObject } from '../models/data-service-object.model';

@Injectable()
export class JournalService extends DataService<Journal> {

	protected foreignKeyName = null;
	protected searchKeyName = "transactionDate";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "journals");
	}

	protected createModel(json): Journal {
		return new Journal(json);
	}

	insert(journal: Journal): DataServiceObject
	{
		var journalObject = {
			transactionDate: journal.transactionDate,
			debitAccount: journal.debitAccount.$key,
			creditAccount: journal.creditAccount.$key,
			transactionAmount: journal.transactionAmount
		}
		return super.insert(journalObject);
	}

}
