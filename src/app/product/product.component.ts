import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/all-data.service';
import { AuthGuard } from '../services/auth.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-product-list',
	template: `
		<main class="container">	
			<jam-list class="stretch-with-max"
				[stream]="productStream"
				iconName="card_giftcard"
				newItemUrl="new/edit"
				selectItemUrl="admin/dimension/product/:key">
				<template let-item="item" let-index="index" let-hoveredIndex="hoveredIndex" let-selectedIndex="selectedIndex">
					<div class="template-container">
						<div class="item-name"> {{ item.name }} </div>
						<div class="item-brand"> {{ item.brand }} </div>
						<div class="item-size"> {{ item.size }} </div>
						<div class="item-color"> {{ item.color }} </div>
						<div class="item-picture"> {{ item.picture }} </div>
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
export class ProductListComponent implements OnInit {

	private productStream: Observable<Product[]>;

	ngOnInit() {}
	constructor(private productService: ProductService)
	{
		this.productStream = this.productService.getList(SORT.VALUE, FILTER.NONE);
	}

}

@Component({
	selector: 'app-product',
	template: `
		<jam-list-item title="Product" subtitle="view"
			[dataService]="productService"
			editItemUrl="edit"
			returnUrl="admin/dimension/product"
			[item]="item">
			<div jam-list-item-template>
				<div> {{ item?.name }} </div>
				<div> {{ item?.brand }} </div>
				<div> {{ item?.size }} </div>
				<div> {{ item?.color }} </div>
				<div> {{ item?.picture }} </div>
			</div>
		</jam-list-item>
	`
})
export class ProductComponent implements OnInit {

	private item: Product;

	ngOnInit() {}
	constructor(private productService: ProductService,
				private route: ActivatedRoute)
	{
		var key = this.route.snapshot.params['key'];
		this.productService.getObject(key).subscribe( object => this.item = object );
	}

}


@Component({
	selector: 'app-product-form',
	template: `
		<jam-form title="Product"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="productService"
				returnUrl="/admin/dimension/product">
		</jam-form>
	`
})
export class ProductFormComponent implements OnInit 
{

	private formElements: any[];
	private item: Product;

	ngOnInit() {}
	constructor(private productService: ProductService,
				private authGuard: AuthGuard,
				private route: ActivatedRoute) 
	{
		
		this.formElements = this.generateFormElements(this.item);

		var key = this.route.snapshot.params['key'];
		if(key != 'new') {
			this.productService.getObject(key).subscribe(object => {
				this.item = object;
				this.formElements = this.generateFormElements(this.item);
			});
		}

	}

	generateFormElements(item: Product) : any[]
	{
		if(item === undefined)
			item = new Product();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'name', exclude: false, initialValue: item.name, type: 'text', placeHolder: 'Name', formControlName: 'name' },
			{ key: 'brand', exclude: false, initialValue: item.brand, type: 'text', placeHolder: 'Brand', formControlName: 'brand' },
			{ key: 'size', exclude: false, initialValue: item.size, type: 'number', placeHolder: 'Size', formControlName: 'size' },
			{ key: 'color', exclude: false, initialValue: item.color, type: 'text', placeHolder: 'Color', formControlName: 'color' ,},
			{ key: 'picture', exclude: false, initialValue: item.picture, type: 'text', placeHolder: 'Picture', formControlName: 'picture' }
		];
		return formElements;
	}

}