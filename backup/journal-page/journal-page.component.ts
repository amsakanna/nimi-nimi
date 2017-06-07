import { Component, OnInit, Input, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import { AccountService } from '../services/account.service';
import { JournalService } from '../services/journal.service';
import { KeyValService } from '../services/key-val.service';
import { Account } from '../models/account.model';
import { Journal } from '../models/journal.model';
import { KeyVal } from '../models/key-val.model';
import { FILTER, SORT } from '../app.constant';
import { DRAG_STATE, TRIGGER, ANIMATION_STATE } from '../app.enum';
import '../library/extension-methods';
import { JamTable } from '../jam-table/jam-table.component';

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

	private account: Account;	
	private accounts: Account[];
	private accountsBackup: Account[];
	private transactionTypes: KeyVal[];	
	private journalsStream: Observable<Journal[]>;
	private journal: Journal;
	private form: FormGroup;
	private dragState: DRAG_STATE;
	private trigger: TRIGGER;
	private animationState: ANIMATION_STATE;

	constructor(private formBuilder: FormBuilder,
				private accountService: AccountService,
				private journalService: JournalService,
				private keyValService: KeyValService) 
	{

		this.newForm();

		this.accountService.getList(SORT.NONE, FILTER.NONE, undefined).take(1).subscribe(data => {
			this.accounts = data.slice();
			this.accountsBackup = data.slice();
		});
				
		this.keyValService.setTable('transactionType');
		this.keyValService.getList(SORT.NONE, FILTER.NONE, undefined).take(1).subscribe(data => {
			this.transactionTypes = data.slice();
		});

		this.journalsStream = this.journalService.getList(SORT.SEARCH_KEY, FILTER.NONE, undefined);
		this.journalsStream = this.journalsStream.map(journals => journals.map(journal => {
			this.accountService.getObject(journal.debitAccount.$key).subscribe(account => journal.debitAccount = account);
			this.accountService.getObject(journal.creditAccount.$key).subscribe(account => journal.creditAccount = account);
			return journal;									
		}));

	}

	ngOnInit() {
	}

	newForm() 
	{
		this.form = this.formBuilder.group({
			transactionType: ['', Validators.required],
			account: ['', Validators.required],
			transactionAmount: [0, Validators.required]
		});
		var newAccount: Account = new Account({$key: '', name: '', parent: ''});
		this.journal = new Journal({$key: '', transactionDate: (new Date()).toLocaleDateString(), debitAccount: newAccount, creditAccount: newAccount, transactionAmount: 0});
	}

	submitForm() {
		var newAccount: Account = new Account({$key: '', name: '', parent: ''});		
		this.journal.transactionAmount = this.form.get('transactionAmount').value;
		this.journalService.insert(this.journal);
	}

	dragStart(event, data: any, trigger: TRIGGER) {
		this.dragState = DRAG_STATE.START;
		if (trigger == TRIGGER.TRANSACTION_TYPE)
			console.log(trigger);
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

	searchAccount(key: string) {		
		if(key == '') {
			this.accounts = this.accountsBackup.slice();
		}
		else {
			this.accountsBackup.forEach(account => 
			{				
				var accountMatchesInBackup = account.name.doesExist(key, true);
				var i = this.accounts.indexOf(account);
				var accountMatches = (i >= 0);
				if(accountMatchesInBackup && ! accountMatches)
					this.accounts.push(account);
				else if(!accountMatchesInBackup && accountMatches)
					this.accounts.splice(i, 1);				
			})
		}
	}

	updateJournalPreview(formControlName: string)
	{
		if(formControlName == 'transactionAmount') {
			this.journal.transactionAmount = this.form.get('transactionAmount').value;
		}
		var transactionType = this.form.get('transactionType').value;
		var account = this.form.get('account').value;
		switch (transactionType) {
			case 'Purchase':
				this.journal.debitAccount = new Account({$key: '', name: account, parent: ''});
				this.journal.creditAccount = new Account({$key: '', name: 'Cash', parent: ''});
				break;
			case 'Sales':
				this.journal.debitAccount = new Account({$key: '', name: 'Cash', parent: ''});
				this.journal.creditAccount = new Account({$key: '', name: account, parent: ''});
				break;
			case 'Payment':
				this.journal.debitAccount = new Account({$key: '', name: account, parent: ''});
				this.journal.creditAccount = new Account({$key: '', name: 'Cash', parent: ''});					
				break;
			case 'Receipt':
				this.journal.debitAccount = new Account({$key: '', name: 'Cash', parent: ''});
				this.journal.creditAccount = new Account({$key: '', name: account, parent: ''});
				break;
			case 'Others':
				break;			
			default:
				break;
		}		
	}

}
