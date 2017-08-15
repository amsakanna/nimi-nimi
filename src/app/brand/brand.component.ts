import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../services/all-data.service';
import { AuthGuard } from '../services/auth.service';
import { Brand } from '../models/brand.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-brand-list',
	template: `
		<main class="container">	
			<jam-list class="stretch-with-max"
				[stream]="brandStream"
				iconName="aspect_ratio"
				newItemUrl="new/edit"
				selectItemUrl="admin/dimension/brand/:key">
				<template let-item="item" let-index="index" let-hoveredIndex="hoveredIndex" let-selectedIndex="selectedIndex">
					<div class="template-container">
						<div class="item-name"> {{ item.name }} </div>
						<div class="item-rating"> {{ item.rating }} </div>
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
export class BrandListComponent implements OnInit {

	private brandStream: Observable<Brand[]>;

	ngOnInit() {}
	constructor(private brandService: BrandService)
	{
		this.brandStream = this.brandService.getList(SORT.VALUE, FILTER.NONE);
	}

}

@Component({
	selector: 'app-brand',
	template: `
		<jam-list-item title="Brand" subtitle="view"
			[dataService]="brandService"
			editItemUrl="edit"
			returnUrl="admin/dimension/brand"
			[item]="item">
			<div jam-list-item-template>
				<div> {{ item?.name }} </div>
				<div> {{ item?.rating }} </div>
			</div>
		</jam-list-item>
	`
})
export class BrandComponent implements OnInit {

	private item: Brand;

	ngOnInit() {}
	constructor(private brandService: BrandService,
				private route: ActivatedRoute) {}

	ngDoCheck()
	{
		var key = this.route.snapshot.params['key'];
		this.brandService.getObject(key).subscribe( object => this.item = object );
	}

}


@Component({
	selector: 'app-brand-form',
	template: `
		<jam-form title="Brand"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="brandService"
				returnUrl="/admin/dimension/brand">
		</jam-form>
	`
})
export class BrandFormComponent implements OnInit 
{

	private formElements: any[];
	private item: Brand;

	ngOnInit() {}
	constructor(private brandService: BrandService,
				private authGuard: AuthGuard,
				private route: ActivatedRoute) 
	{
		
		this.formElements = this.generateFormElements(this.item);

		var key = this.route.snapshot.params['key'];
		if(key != 'new') {
			this.brandService.getObject(key).subscribe(object => {
				this.item = object;
				this.formElements = this.generateFormElements(this.item);
			});
		}

	}

	generateFormElements(item: Brand) : any[]
	{
		if(item === undefined)
			item = new Brand();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'name', exclude: false, initialValue: item.name, type: 'text', placeHolder: 'Name', formControlName: 'name' },
			{ key: 'rating', exclude: false, initialValue: item.rating, type: 'number', placeHolder: 'Rating', formControlName: 'rating' }
		];
		return formElements;
	}

}