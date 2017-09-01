import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { ActivatedRoute } from '@angular/router';
import { JournalService } from '../services/all-data.service';
import { AuthService } from '../services/auth.service';
import { Journal } from '../models/journal.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-journal-list',
	template: `
		<main class="container">	
			<jam-list class="stretch-with-max"
				[stream]="journalStream"
				iconName="assignment"
				newItemUrl="new/edit"
				selectItemUrl="admin/transaction/journal/:key">
				<template let-item="item" let-index="index" let-hoveredIndex="hoveredIndex" let-selectedIndex="selectedIndex">
					<div class="template-container">
						<div class="item-transactionAmount"> {{ item.transactionAmount }} </div>
						<div class="item-transactionDate"> {{ item.transactionDate }} </div>
					</div>
				</template>
			</jam-list>
		</main>		
	`,
	styles: [`
		main {
			height: 100%;
		}
	`]
})
export class JournalListComponent implements OnInit {

	private journalStream: Observable<Journal[]>;

	ngOnInit() {}
	constructor(private journalService: JournalService)
	{
		this.journalStream = this.journalService.getList(SORT.VALUE, FILTER.NONE);
	}

}

@Component({
	selector: 'app-journal',
	template: `
		<jam-list-item title="Journal" subtitle="view"
			[dataService]="journalService"
			editItemUrl="edit"
			returnUrl="admin/transaction/journal"
			[item]="item">
			<div jam-list-item-template>
				<div> {{ item?.transactionAmount }} </div>
				<div> {{ item?.transactionDate }} </div>
			</div>
		</jam-list-item>
	`
})
export class JournalComponent implements OnInit {

	private item: Journal;

	ngOnInit() {}
	constructor(private journalService: JournalService,
				private route: ActivatedRoute)
	{
		var key = this.route.snapshot.params['key'];
		this.journalService.getObject(key).subscribe( object => this.item = object );
	}

}


@Component({
	selector: 'app-journal-form',
	template: `
		<jam-form title="Journal"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="journalService"
				returnUrl="/admin/transaction/journal">
		</jam-form>
	`
})
export class JournalFormComponent implements OnInit 
{

	private formElements: any[];
	private item: Journal;

	ngOnInit() {}
	constructor(private journalService: JournalService,
				private authService: AuthService,
				private route: ActivatedRoute) 
	{
		
		this.formElements = this.generateFormElements(this.item);

		var key = this.route.snapshot.params['key'];
		if(key != 'new') {
			this.journalService.getObject(key).subscribe(object => {
				this.item = object;
				this.formElements = this.generateFormElements(this.item);
			});
		}

	}

	generateFormElements(item: Journal) : any[]
	{
		if(item === undefined)
			item = new Journal();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'transactionAmount', exclude: false, initialValue: item.transactionAmount, type: 'number', placeHolder: 'Transaction Amount', formControlName: 'transactionAmount' },
			{ key: 'transactionDate', exclude: false, initialValue: item.transactionDate, type: 'date', placeHolder: 'Transaction Date', formControlName: 'transactionDate' }
		];
		return formElements;
	}

}