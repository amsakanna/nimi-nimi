import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Account } from '../models/account.model';

@Injectable()
export class AccountService extends DataService {

	protected createModel = (json) => new Account(json);
	protected foreignKeyName = null;
	protected searchKeyName = "name";

	constructor(db: AngularFireDatabase) {
		super(db, "accounts");
	}

}
