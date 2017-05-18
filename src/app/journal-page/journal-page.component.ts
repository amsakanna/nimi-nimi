import { Component, OnInit, Input, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import { AccountService } from '../services/account.service';
import { JournalService } from '../services/journal.service';
import { KeyValService } from '../services/key-val.service';
import { Account } from '../models/account.model';
import { Journal } from '../models/journal.model';
import { FILTER, SORT, DRAG_STATE, TRIGGER, ANIMATION_STATE } from '../models/constants';
import '../library/extension-methods';

@Component({
	selector: 'app-journal-page',
	templateUrl: './journal-page.component.html',
	styleUrls: ['./journal-page.component.css'],
	animations: [
		trigger('listItemAnimation', [
			state('listItemState', style({				
				transform: 'translateY(0px)'			  
			})),			
			transition('void => *', animate('200ms ease-in', keyframes([
				style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
				// style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
				style({opacity: 1, transform: 'translateY(0px)',     offset: 1.0})
			]))),		
			transition('* => void', animate('200ms ease-out', keyframes([
				style({opacity: 1, transform: 'translateY(0px)',     offset: 0}),
				// style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
				style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
			]))),
		])
	]
})
export class JournalPageComponent implements OnInit {	

	private accountStream: Observable<any[]>;
	private accountStreamFiltered: Observable<any[]>;
	private accounts: Account[];
	private accountsBackup: Account[];
	private transactionTypesStream: Observable<any[]>;
	private dragState: DRAG_STATE;
	private trigger: TRIGGER;
	private animationState: ANIMATION_STATE;
	private journal: Journal;
	private transactionType: any;
	private account: Account;	

	constructor(private accountService: AccountService,
				private journalService: JournalService,
				private keyValService: KeyValService) {

		this.accountStream = this.accountService.getList(SORT.NONE, FILTER.NONE, undefined).take(1);
		this.accountStream.subscribe(data => {
			this.accounts = data.slice();
			this.accountsBackup = data.slice();
		});
		
		this.accountStreamFiltered = this.accountStream;
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

	searchAccounts(key: string) {		
		if(key == '') {
			this.accounts = this.accountsBackup.slice();
		}
		else {
			console.log('key', key);
			console.log('this.accountsBackup', this.accountsBackup);
			this.accountsBackup.forEach(account => 
			{				
				console.log('account', account);
				var accountMatchesInBackup = account.name.doesExist(key);
				console.log('accountMatchesInBackup', accountMatchesInBackup);
				var i = this.accounts.indexOf(account);
				var accountMatches = (i >= 0);
				console.log('accountMatches', accountMatches);
				if(accountMatchesInBackup && ! accountMatches)
					this.accounts.push(account);
				else if(!accountMatchesInBackup && accountMatches)
					this.accounts.splice(i, 1);
			})
		}
	}

}
