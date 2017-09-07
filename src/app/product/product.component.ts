import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService, BrandService, DepartmentService, SizeService, ColorService, PictureService } from '../services/all-data.service';
import { FILTER, SORT, STATUS } from '../app.enum';
import { Product } from '../models/product.model';
import { Brand } from '../models/brand.model';
import { Size } from '../models/size.model';
import { Color } from '../models/color.model';
import { Picture } from '../models/picture.model';

// declare var firebase : any;

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
						<div class="icon-container">
							<div class="item-picture">
								<img
									*ngIf="item?.picture"
									[src]="item?.picture?.frontView" />
							</div>
						</div>
						<div class="data-container">
							<div class="item-name"> {{ item.name }} </div>
							<div class="item-brand"> {{ item.brand.name }} </div>
							<div class="item-size"> {{ item.size.code }} </div>
							<div class="item-color"> {{ item.color.name }} </div>
						</div>
					</div>
				</template>
			</jam-list>
		</main>		
	`,
	styles: [`
		main {
			height: 100%;
		}
		.template-container {
			display: flex;
		}
		.icon-container, .item-picture > img {
			width: 50px;
			height: 50px;
		}
		.data-container {
			flex-grow: 1;
		}
	`]
})
export class ProductListComponent implements OnInit {

	private productStream: Observable<Product[]>;

	ngOnInit() {}
	constructor(private productService: ProductService,
				private brandService: BrandService,
				private departmentService: DepartmentService,
				private sizeService: SizeService,
				private colorService: ColorService,
				private pictureService: PictureService)
	{
		var alternateImageUrl = 'https://firebasestorage.googleapis.com/v0/b/nimi-nimi.appspot.com/o/thumbnails%2Fproducts%2Fpicture_unavailable.png?alt=media&token=84fb29af-20c8-4102-9e88-0897a16e1bd4';
		this.productStream = this.productService
			.getList(SORT.VALUE, FILTER.NONE)
			.map( productList => productList.map( product => {
				this.pictureService.getObject( product.picture.$key ).subscribe( picture => {
					product.picture = picture;
					if( ! product.picture.frontView )
						product.picture.frontView = alternateImageUrl;
				});
				this.brandService.getObject( product.brand.$key ).subscribe( brand => product.brand = brand );
				this.departmentService.getObject( product.department.$key ).subscribe( department => product.department = department );
				this.sizeService.getObject( product.size.$key ).subscribe( size => product.size = size );
				this.colorService.getObject( product.color.$key ).subscribe( color => product.color = color );
				return product;
			}));;	
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
				<div class="item-picture">
					<img
						*ngIf="item.picture"
						[src]="item.picture?.frontView" />
				</div>
				<div> {{ item.name }} </div>
				<div> {{ item.brand.name }} </div>
				<div> {{ item.size.code }} </div>
				<div> {{ item.color.name }} </div>
			</div>
		</jam-list-item>
	`,
	styles: [`
		.item-picture, .item-picture > img {
			width: 100px;
			height: 150px;
		}
	`]
})
export class ProductComponent implements OnInit {

	private item: Product;

	ngOnInit() {}
	constructor(private route: ActivatedRoute,
				private productService: ProductService,				
				private brandService: BrandService,
				private departmentService: DepartmentService,
				private sizeService: SizeService,
				private colorService: ColorService,
				private pictureService: PictureService)
	{
		var key = this.route.snapshot.params['key'];
		this.item = new Product();
		this.productService
			.getObject(key)
			.map( product => {
				this.item = product;
				this.pictureService.getObject( product.picture.$key ).subscribe( picture => product.picture = picture );
				this.brandService.getObject( product.brand.$key ).subscribe( brand => product.brand = brand );
				this.departmentService.getObject( product.department.$key ).subscribe( department => product.department = department );
				this.sizeService.getObject( product.size.$key ).subscribe( size => product.size = size );
				this.colorService.getObject( product.color.$key ).subscribe( color => product.color = color );
				return product;
			})
			.subscribe( product => this.item = product );
	}

}


@Component({
	selector: 'app-product-form',
	template: `
		<jam-form title="Product"
				subtitle="edit"
				returnUrl="/admin/dimension/product"
				[formElements]="formElements"
				[dataService]="productService"
				[preProcessUpdate]="preProcessUpdate"
				(save)="save()">
		</jam-form>
	`,
	styles: [`
		.item-color {
			width: 50px;
			height: 50px;
		}
	`]
})
export class ProductFormComponent implements OnInit 
{

	private formElements: any[];
	private item: Product;
	private options: any;
	private loadNotify: Subject<string>;
	private completedItemList: Array<string>;
	private preProcessUpdate: (itemUnderChange: any) => Observable<Observable<Observable<any>>>;
	
	ngOnInit() {}
	constructor(private authService: AuthService,
				private route: ActivatedRoute,
				private productService: ProductService,
				private brandService: BrandService,
				private departmentService: DepartmentService,
				private sizeService: SizeService,
				private colorService: ColorService,
				private pictureService: PictureService)
	{

		this.loadNotify = new Subject<any>();
		this.completedItemList = new Array<string>();
		this.item = new Product();
		this.options = { 
			brand: new Array<any>(),
			department: new Array<any>(),
			size: new Array<any>(),
			color: new Array<any>()
		};

		this.preProcessUpdate = function( itemUnderChange: any ) : Observable<Observable<Observable<any>>>
		{
			var preProcessedItem: any;
			var pictureObject: any;
			var firebaseStorage: any;
			var pictureFiles: Array<File>;

			preProcessedItem = itemUnderChange;
			pictureFiles = new Array<File>();
			pictureFiles.push( preProcessedItem.pictureKey );
			firebaseStorage = firebase.storage();
			
			// Upload file to server			
			return Observable
				.fromPromise( <Promise<any>> firebaseStorage
					.ref( 'thumbnails/products/' + pictureFiles[0].name )
					.put( pictureFiles[0] )
					.then( (snapshot) => {
						return Observable
							.fromPromise( <Promise<any>> firebaseStorage
								.ref( snapshot.metadata.fullPath )
								.getDownloadURL()
								.then( (url: string) => {
									var pictureObject = {
										frontView: url
									};
									return pictureService
										.upsert( pictureObject, pictureObject.frontView, 'frontView' )
										.map( (dataServiceObject) => {
											preProcessedItem.pictureKey = dataServiceObject.object.$key;
											return preProcessedItem;
								});
						}));
			}));


		}

		this.formElements = this.generateFormElements();

		this.loadNotify.subscribe( completedItem => {
			this.completedItemList.push( completedItem );
			if( this.completedItemList.sort().join('-') == 'options.brand-options.color-options.department-options.size-product.brand-product.color-product.department-product.picture-product.size' )
				this.formElements = this.generateFormElements();
		});

		var key = this.route.snapshot.params['key'];
		if(key != 'new') {
			this.productService
				.getObject(key)
				.map( product => {
					this.pictureService.getObject( product.picture.$key ).subscribe( picture => {
						product.picture = picture;
						this.loadNotify.next( 'product.picture' );
					});
					this.brandService.getObject( product.brand.$key ).subscribe( brand => {
						product.brand = brand;
						this.loadNotify.next( 'product.brand' );
					});
					this.departmentService.getObject( product.department.$key ).subscribe( department => {
						product.department = department;
						this.loadNotify.next( 'product.department' );
					});
					this.sizeService.getObject( product.size.$key ).subscribe( size => {
						product.size = size;
						this.loadNotify.next( 'product.size' );
					});
					this.colorService.getObject( product.color.$key ).subscribe( color => {
						product.color = color;
						this.loadNotify.next( 'product.color' );
					});
					return product;
				})
				.subscribe( product => {
					this.item = product;					
				});
		}

		this.brandService
			.getList( SORT.NONE, FILTER.NONE )
			.subscribe( list => {
				list.forEach( item => this.options.brand.push( { value: item.$key, displayValue: item.name } ) )
				this.loadNotify.next( 'options.brand' );
			});
		this.departmentService
			.getList( SORT.NONE, FILTER.NONE )
			.subscribe( list => {
				list.forEach( item => this.options.department.push( { value: item.$key, displayValue: item.name } ) )
				this.loadNotify.next( 'options.department' );
			});
		this.sizeService
			.getList( SORT.NONE, FILTER.NONE )
			.subscribe( list => {
				list.forEach( item => this.options.size.push( { value: item.$key, displayValue: item.code } ) )
				this.loadNotify.next( 'options.size' );
			});
		this.colorService
			.getList( SORT.NONE, FILTER.NONE )
			.subscribe( list => {
				list.forEach( item => this.options.color.push( { value: item.$key, displayValue: item.name } ) )
				this.loadNotify.next( 'options.color' );				
			});

	}

	generateFormElements(): any[] 
	{
		return [
			{ key: '$key', exclude: true, initialValue: this.item.$key },
			{ key: 'id', exclude: true, initialValue: this.item.id },
			{ key: 'pictureKey', exclude: false, initialValue: this.item.picture.$key, type: 'photoUploader', placeHolder: 'Picture', formControlName: 'pictureKey', float: 'right', file: '', url: this.item.picture.frontView },
			{ key: 'name', exclude: false, initialValue: this.item.name, type: 'text', placeHolder: 'Name', formControlName: 'name', float: 'left' },
			{ key: 'price', exclude: false, initialValue: this.item.price, type: 'text', placeHolder: 'Price', formControlName: 'price' },
			{ key: 'brandKey', exclude: false, initialValue: this.item.brand.$key, type: 'dropdown', placeHolder: 'Brand', formControlName: 'brandKey', options: this.options.brand, selectedValue: this.item.brand.$key, float: 'left' },
			{ key: 'departmentKey', exclude: false, initialValue: this.item.department.$key, type: 'dropdown', placeHolder: 'Department', formControlName: 'departmentKey', options: this.options.department, selectedValue: this.item.department.$key, float: 'left' },
			{ key: 'sizeKey', exclude: false, initialValue: this.item.size.$key, type: 'dropdown', placeHolder: 'Size', formControlName: 'sizeKey', options: this.options.size, selectedValue: this.item.size.$key, clear: 'both', float: 'left' },
			{ key: 'colorKey', exclude: false, initialValue: this.item.color.$key, type: 'dropdown', placeHolder: 'Color', formControlName: 'colorKey', options: this.options.color, selectedValue: this.item.color.$key, float: 'left' },
		];
	}

	save()
	{
	}

}