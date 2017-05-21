import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Journal } from '../models/journal.model';
import { Account } from '../models/account.model';

@Injectable()
export class JournalService extends DataService {

	protected createModel = (json) => this.createJournal(json);
	protected foreignKeyName = null;
	protected searchKeyName = "transactionDate";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "journals");
	}

	insert(journal: Journal) 
	{
		var journalObject = {
			transactionDate: journal.transactionDate,
			debitAccount: journal.debitAccount.$key,
			creditAccount: journal.creditAccount.$key,
			transactionAmount: journal.transactionAmount
		}
		super.insert(journalObject);
	}

	private createJournal(json) : any {		
		var journal = new Journal({
			$key: json.$key,
			transactionDate: json.transactionDate,
			debitAccount: new Account({$key: json.debitAccount, name: '', parent: ''}),
			creditAccount: new Account({$key: json.creditAccount, name: '', parent: ''}),
			transactionAmount: json.transactionAmount
		});
		return journal;
	}

}
