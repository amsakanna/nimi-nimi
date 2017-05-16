import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.model';
import { FILTER, SORT } from '../models/constants';

enum DRAG_STATE {
	START,
	OVER,
	DROP
}

enum TRANSACTION_PLAYER {
	GIVER,
	RECEIVER
}

@Component({
  selector: 'app-journal-page',
  templateUrl: './journal-page.component.html',
  styleUrls: ['./journal-page.component.css']
})
export class JournalPageComponent implements OnInit {

	private accountStream: Observable<any[]>;
	private dragState: DRAG_STATE;
	private transactionPlayer = TRANSACTION_PLAYER;
	private giverAccount: Account = new Account({$key: '', name: '', parent: ''});
	private receiverAccount: Account = new Account({$key: '', name: '', parent: ''});
	private transactionAmount: number;

	constructor(private accountService: AccountService) {
		this.accountStream = this.accountService.getList(SORT.NONE, FILTER.NONE, undefined);
		this.transactionAmount = 500;
	}

	ngOnInit() {
	}

	dragStart(event, account: Account, trigger: TRANSACTION_PLAYER) {
		this.dragState = DRAG_STATE.START;
		if (trigger == TRANSACTION_PLAYER.GIVER)
			this.giverAccount = account;
		else if (trigger == TRANSACTION_PLAYER.RECEIVER)
			this.receiverAccount = account;
		event.dataTransfer.setData('text', account.name);
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

}
