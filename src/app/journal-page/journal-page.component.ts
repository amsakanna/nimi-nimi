import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { JournalService } from '../services/journal.service';
import { KeyValService } from '../services/key-val.service';
import { Account } from '../models/account.model';
import { Journal } from '../models/journal.model';
import { FILTER, SORT } from '../models/constants';

enum DRAG_STATE {
	START,
	OVER,
	DROP
}

enum TRIGGER {
	TRANSACTION_TYPE,
	ACCOUNT
}

@Component({
  selector: 'app-journal-page',
  templateUrl: './journal-page.component.html',
  styleUrls: ['./journal-page.component.css']
})
export class JournalPageComponent implements OnInit {

	private accountStream: Observable<any[]>;
	private transactionTypesStream: Observable<any[]>;
	private dragState: DRAG_STATE;
	private trigger = TRIGGER;
	private journal: Journal;
	private transactionType: any;
	private account: Account;	

	constructor(private accountService: AccountService,
				private journalService: JournalService,
				private keyValService: KeyValService) {

		this.accountStream = this.accountService.getList(SORT.NONE, FILTER.NONE, undefined);
		this.keyValService.setTable('transactionType');
		this.transactionTypesStream = this.keyValService.getList(SORT.NONE, FILTER.NONE, undefined);

		var newAccount: Account = new Account({$key: '', name: '', parent: ''});
		this.journal = new Journal({
			$key: '',			
			debitAccount: newAccount,
			creditAccount: newAccount,
			transactionAmount: 0,
			transactionDate: ''
		});
	}

	ngOnInit() {
	}

	dragStart(event, data: any, trigger: TRIGGER) {
		this.dragState = DRAG_STATE.START;
		if (trigger == TRIGGER.TRANSACTION_TYPE)
			this.transactionType = data;
		else if (trigger == TRIGGER.ACCOUNT)
			this.account = <Account> data;
		event.dataTransfer.setData('text', data);
		event.dataTransfer.effectAllowed = 'move';
	}

	dragOver(event) {
		this.dragState = DRAG_STATE.OVER;
		event.preventDefault();
	}

	drop(event) {
		this.dragState = DRAG_STATE.DROP;
		var data = event.dataTransfer.getData('text');
		event.preventDefault();
	}

	updateTransactionAmount(input: string) {
		switch (input) {
			case 'C':
				this.journal.transactionAmount = 0;
				break;
			case 'D':
				this.journal.transactionAmount = Math.floor(this.journal.transactionAmount / 10);
				break;
			default:
				this.journal.transactionAmount = (this.journal.transactionAmount * 10) + (+input);
				break;
		}
	}

	addJournal() {
		this.journalService.add(this.journal);
	}

}
