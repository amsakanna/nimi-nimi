import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { ActivatedRoute } from '@angular/router';
import { SizeService } from '../services/all-data.service';
import { AuthService } from '../services/auth.service';
import { Size } from '../models/size.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-size-list',
	template: `
		<main class="container">	
			<jam-list class="stretch-with-max"
				[stream]="sizeStream"
				iconName="assignment"
				newItemUrl="new/edit"
				selectItemUrl="admin/dimension/size/:key">
				<template let-item="item" let-index="index" let-hoveredIndex="hoveredIndex" let-selectedIndex="selectedIndex">
					<div class="template-container">
						<div class="item-code"> {{ item.code }} </div>
					</div>
				</template>
			</jam-list>
		</main>		
	`,
	styles: [`
		main {
			height: 100%;
		}
		.item-size {
			width: 10px;
			height: 10px;
		}
	`]
})
export class SizeListComponent implements OnInit {

	private sizeStream: Observable<Size[]>;

	ngOnInit() {}
	constructor(private sizeService: SizeService)
	{
		this.sizeStream = this.sizeService.getList(SORT.VALUE, FILTER.NONE);
	}

}

@Component({
	selector: 'app-size',
	template: `
		<jam-list-item title="Size" subtitle="view"
			[dataService]="sizeService"
			editItemUrl="edit"
			returnUrl="admin/dimension/size"
			[item]="item">
			<div jam-list-item-template>
				<div> {{ item?.code }} </div>
			</div>
		</jam-list-item>
	`
})
export class SizeComponent implements OnInit {

	private item: Size;

	ngOnInit() {}
	constructor(private sizeService: SizeService,
				private route: ActivatedRoute)
	{
		var key = this.route.snapshot.params['key'];
		this.sizeService.getObject(key).subscribe( object => this.item = object );
	}

}


@Component({
	selector: 'app-size-form',
	template: `
		<jam-form title="Size"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="sizeService"
				returnUrl="/admin/dimension/size">
		</jam-form>
	`
})
export class SizeFormComponent implements OnInit 
{

	private formElements: any[];
	private item: Size;

	ngOnInit() {}
	constructor(private sizeService: SizeService,
				private authService: AuthService,
				private route: ActivatedRoute) 
	{
		
		this.formElements = this.generateFormElements(this.item);

		var key = this.route.snapshot.params['key'];
		if(key != 'new') {
			this.sizeService.getObject(key).subscribe(object => {
				this.item = object;
				this.formElements = this.generateFormElements(this.item);
			});
		}

	}

	generateFormElements(item: Size) : any[]
	{
		if(item === undefined)
			item = new Size();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'code', exclude: false, initialValue: item.code, type: 'text', placeHolder: 'Code', formControlName: 'code' }
		];
		return formElements;
	}

}