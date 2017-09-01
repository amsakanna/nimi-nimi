import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../services/all-data.service';
import { AuthService } from '../services/auth.service';
import { Inventory } from '../models/inventory.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-inventory-list',
	template: `
		<main class="container floating-box">	
			<jam-list class="stretch-with-max"
				[stream]="inventoryStream"
				iconName="dns"
				newItemUrl="new/edit"
				selectItemUrl="admin/transaction/inventory/:key">
				<template let-item="item" let-index="index" let-hoveredIndex="hoveredIndex" let-selectedIndex="selectedIndex">
					<div class="template-container">
						<div class="item-units"> {{ item.units }} </div>
						<div class="item-price"> {{ item.price }} </div>
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
export class InventoryListComponent implements OnInit {

	private inventoryStream: Observable<Inventory[]>;

	ngOnInit() {}
	constructor(private inventoryService: InventoryService)
	{
		this.inventoryStream = this.inventoryService.getList(SORT.VALUE, FILTER.NONE);
	}

}

@Component({
	selector: 'app-inventory',
	template: `
		<jam-list-item title="Inventory" subtitle="view"
			[dataService]="inventoryService"
			editItemUrl="edit"
			returnUrl="admin/transaction/inventory"
			[item]="item">
			<div jam-list-item-template>
				<div> {{ item?.units }} </div>
				<div> {{ item?.price }} </div>
			</div>
		</jam-list-item>
	`
})
export class InventoryComponent implements OnInit {

	private item: Inventory;

	ngOnInit() {}
	constructor(private inventoryService: InventoryService,
				private route: ActivatedRoute) {}

	ngDoCheck()
	{
		var key = this.route.snapshot.params['key'];
		this.inventoryService.getObject(key).subscribe( object => this.item = object );
	}

}


@Component({
	selector: 'app-inventory-form',
	template: `
		<jam-form title="Inventory"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="inventoryService"
				returnUrl="/admin/transaction/inventory">
		</jam-form>
	`
})
export class InventoryFormComponent implements OnInit 
{

	private formElements: any[];
	private item: Inventory;

	ngOnInit() {}
	constructor(private inventoryService: InventoryService,
				private authService: AuthService,
				private route: ActivatedRoute) 
	{
		
		this.formElements = this.generateFormElements(this.item);

		var key = this.route.snapshot.params['key'];
		if(key != 'new') {
			this.inventoryService.getObject(key).subscribe(object => {
				this.item = object;
				this.formElements = this.generateFormElements(this.item);
			});
		}

	}

	generateFormElements(item: Inventory) : any[]
	{
		if(item === undefined)
			item = new Inventory();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'units', exclude: false, initialValue: item.units, type: 'number', placeHolder: 'Units', formControlName: 'units' },
			{ key: 'price', exclude: false, initialValue: item.price, type: 'number', placeHolder: 'Price', formControlName: 'price' }
		];
		return formElements;
	}

}