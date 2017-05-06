import { Component, OnInit, Inject, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FirebaseApp } from 'angularfire2';

@Component({
	selector: 'app-admin-page',
	templateUrl: './admin-page.component.html',
	styleUrls: ['./admin-page.component.css'],
	animations: [
		trigger('toggleGrid', [
			state('inactive', style({
				transform: 'scale(1)',
				height: 'auto'
			})),
			state('active', style({
				transform: 'scale(0.1)',
				height: '300px'
			})),
			transition('inactive => active', animate('200ms ease-in')),
			transition('active => inactive', animate('200ms ease-out'))
		]),
		trigger('toggleFooter', [
			state('inactive', style({
				height: '100px'
			})),
			state('active', style({
				height: '500px'
				// backgroundColor: 'rgba(255, 255, 255, 0.95)'
			})),
			transition('inactive => active', animate('200ms ease-in')),
			transition('active => inactive', animate('200ms ease-out'))
		]),
		trigger('toggleProductFormCard', [
			state('inactive', style({
				opacity: 0
			})),
			state('active', style({
				opacity: 1
			})),
			transition('inactive => active', animate('50ms ease-in')),
			transition('active => inactive', animate('50ms ease-out'))
		]),
		trigger('toggleFooterButtonImage', [
			state('inactive', style({
				transform: "rotate(360deg)"
			})),
			state('active', style({
				transform: "rotate(180deg)"
			})),
			transition('inactive => active', animate('500ms ease-in')),
			transition('active => inactive', animate('500ms ease-out'))
		]),
		trigger('productOverState', [
			state('inactive', style({
				backgroundColor: "white",
				marginTop: "1px",
				marginBottom: "0px"				
			})),
			state('active', style({
				backgroundColor: "rgba(255, 255, 255, 0.8)",
				transform: "scale(0.997)"
			})),
			transition('inactive => active', animate('200ms ease-in')),
			transition('active => inactive', animate('200ms ease-out'))
		])
	]
})
export class AdminPageComponent implements OnInit {

  	form: FormGroup;
	firebaseStorage: any;
	products: Product[];
	selectedProducts: Product[];
	allProductsSelected: boolean;
	thumbnailFileUrls: String[];

	state: string = 'inactive';

	constructor(public productService: ProductService, @Inject(FirebaseApp) firebaseApp: any) {

		this.firebaseStorage = firebaseApp.storage();
		this.form = new FormGroup({
			productList: new FormControl("")			
		});
	
		this.products = new Array<Product>();
		this.selectedProducts = new Array<Product>();

		var productJson = {
			$key: "BLIW253",
			id: "BLIW253",
			name: "Skirt",
			price: "450.00",
			thumbnailFileName: "BLIW253.jpg"
		};
		var product = new Product(productJson);
		this.products.push(product);
		var productJson = {
			$key: "BLIW252",
			id: "BLIW252",
			name: "Skirt",
			price: "499.00",
			thumbnailFileName: "BLIW253.jpg"
		};
		var product = new Product(productJson);
		this.products.push(product);
		var productJson = {
			$key: "BLIW251",
			id: "BLIW251",
			name: "Skirt",
			price: "499.00",
			thumbnailFileName: "BLIW253.jpg"
		};
		var product = new Product(productJson);
		this.products.push(product);
		var productJson = {
			$key: "BLIW250",
			id: "BLIW250",
			name: "Skirt",
			price: "499.00",
			thumbnailFileName: "BLIW253.jpg"
		};
		var product = new Product(productJson);
		this.products.push(product);
		var fileLocation = this.firebaseStorage.ref('thumbnails/products/' + product.thumbnailFileName);			
		fileLocation.getDownloadURL().then((url: string) => {
			this.products[0].thumbnailUrl = url;
			console.log(this.products[0].thumbnailUrl);
		});
	}

	ngOnInit() {
	}

	showFileDialog() {
		document.getElementById('fileUploader').click();
	}

	toggleFooter() {
		this.state = (this.state === 'inactive' ? 'active' : 'inactive');
	}

	changeSelection(product: Product) {

		var i = this.selectedProducts.findIndex(item => item.id == product.id);
		var found = (i != -1);		
		
		if(found) { this.selectedProducts.splice(i, 1); }
		if(product.active) { this.selectedProducts.push(product); }
		
		console.log(this.selectedProducts);

	}

	selectAllProducts() {
		if(this.allProductsSelected) {
			this.selectedProducts.forEach( item => item.active = false );
			this.selectedProducts.splice(0, this.selectedProducts.length);
		} else {
			this.selectedProducts.forEach( item => item.active = true );
			this.selectedProducts.splice(0, this.selectedProducts.length);		
		}		
		console.log(this.selectedProducts);
	}

	showProduct(product) {

	}

	addProducts() {
		this.products.forEach(product => {
			this.productService.add(product);
		});		
	}

	previewSelectedFiles(e: MSInputMethodContext) {

		var productText: string[];
		var productJson: any;		
		var fieldDelimiter: string = "-";
		var product: Product;
		var fileLocation: any;
		var thumbnailFiles: FileList;
		var thumbnailFile: File;
		var id;

		// Retrieve selected file details from file dialog
		thumbnailFiles = (<HTMLInputElement> e.target).files;		
		this.products = new Array<Product>();

		// Loop through selected files
		for(var i = 0; i < thumbnailFiles.length; i++) {
			thumbnailFile = thumbnailFiles[i];

			// Split file name by delimiter
			productText = thumbnailFile.name.split(fieldDelimiter);
			id = productText[2].split('.')[0];
			
			// Create product model
			productJson = {
				$key: id,
				id: id,
				name: productText[0],
				price: productText[1],
				thumbnailFileName: productText[2]				
			};			
			product = new Product(productJson);

			// Add product attributes
			product.thumbnailFile = thumbnailFile;

			// Add product to list
			this.products.push(product);
		
			// Upload file to server
			fileLocation = this.firebaseStorage.ref('thumbnails/products/' + product.thumbnailFileName);			
			fileLocation.put(product.thumbnailFile).then((snapshot) => {
				var uploadedFileLocation = this.firebaseStorage.ref(snapshot.metadata.fullPath);				
				uploadedFileLocation.getDownloadURL().then((url: string) => {
					var idFromUrl = url.split('products%2F')[1];
					idFromUrl = idFromUrl.split('.')[0];
					for(var j=0; j<this.products.length; j++) {
						var product = this.products[j];
						if(product.id == idFromUrl) {
							product.thumbnailUrl = url;
							break;
						}
					}				
				});
			});
		}

	}
}
