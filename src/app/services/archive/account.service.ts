import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from './data.service';
import { Account } from '../models/account.model';

@Injectable()
export class AccountService extends DataService<Account> {

	protected foreignKeyName = null;
	protected searchKeyName = "name";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "accounts");
	}

	protected createModel(json) : Account {
		return new Account(json);
	}

}
