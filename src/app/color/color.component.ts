import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from '../services/all-data.service';
import { AuthService } from '../services/auth.service';
import { Color } from '../models/color.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-color-list',
	template: `
		<main class="container">	
			<jam-list class="stretch-with-max"
				[stream]="colorStream"
				iconName="assignment"
				newItemUrl="new/edit"
				selectItemUrl="admin/dimension/color/:key">
				<template let-item="item" let-index="index" let-hoveredIndex="hoveredIndex" let-selectedIndex="selectedIndex">
					<div class="template-container">
						<div class="item-name"> {{ item.name }} </div>
						<div class="item-code"> {{ item.code }} </div>
						<div class="item-color" [style.backgroundColor]="item.code"></div>
					</div>
				</template>
			</jam-list>
		</main>		
	`,
	styles: [`
		main {
			height: 100%;
		}
		.item-color {
			width: 10px;
			height: 10px;
		}
	`]
})
export class ColorListComponent implements OnInit {

	private colorStream: Observable<Color[]>;

	ngOnInit() {}
	constructor(private colorService: ColorService)
	{
		this.colorStream = this.colorService.getList(SORT.VALUE, FILTER.NONE);
	}

}

@Component({
	selector: 'app-color',
	template: `
		<jam-list-item title="Color" subtitle="view"
			[dataService]="colorService"
			editItemUrl="edit"
			returnUrl="admin/dimension/color"
			[item]="item">
			<div jam-list-item-template>
				<div> {{ item?.name }} </div>
				<div> {{ item?.code }} </div>
			</div>
		</jam-list-item>
	`
})
export class ColorComponent implements OnInit {

	private item: Color;

	ngOnInit() {}
	constructor(private colorService: ColorService,
				private route: ActivatedRoute)
	{
		var key = this.route.snapshot.params['key'];
		this.colorService.getObject(key).subscribe( object => this.item = object );
	}

}


@Component({
	selector: 'app-color-form',
	template: `
		<jam-form title="Color"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="colorService"
				returnUrl="/admin/dimension/color">
		</jam-form>
	`
})
export class ColorFormComponent implements OnInit 
{

	private formElements: any[];
	private item: Color;

	ngOnInit() {}
	constructor(private colorService: ColorService,
				private authService: AuthService,
				private route: ActivatedRoute) 
	{
		
		this.formElements = this.generateFormElements(this.item);

		var key = this.route.snapshot.params['key'];
		if(key != 'new') {
			this.colorService.getObject(key).subscribe(object => {
				this.item = object;
				this.formElements = this.generateFormElements(this.item);
			});
		}

	}

	generateFormElements(item: Color) : any[]
	{
		if(item === undefined)
			item = new Color();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'name', exclude: false, initialValue: item.name, type: 'text', placeHolder: 'Name', formControlName: 'name' },
			{ key: 'code', exclude: false, initialValue: item.code, type: 'text', placeHolder: 'Code', formControlName: 'code' }
		];
		return formElements;
	}

}