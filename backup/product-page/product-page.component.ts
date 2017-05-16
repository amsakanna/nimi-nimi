import { Component, OnInit, Inject, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FirebaseApp } from 'angularfire2';
import { ColorPickerService  } from 'angular2-color-picker';

enum Mode {
	List = 0,
	Edit = 1
}

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.css'],
	animations: [
		trigger('productOverState', [
			state('inactive', style({
				backgroundColor: 'white',
				marginTop: '1px',
				marginBottom: '0px'				
			})),
			state('active', style({
				backgroundColor: 'rgba(255, 255, 255, 0.6)',
				transform: 'scale(0.997)'
			})),
			transition('inactive => active', animate('200ms ease-in')),
			transition('active => inactive', animate('200ms ease-out'))
		])
	]
})
export class ProductPageComponent implements OnInit {

  	productForm: FormGroup = new FormGroup({
		  name: new FormControl('', Validators.required),
		  price: new FormControl('0', Validators.required),
		  units: new FormControl('0', Validators.required),
		  color: new FormControl(''),	  
		  size: new FormControl('')	  
	});
	firebaseStorage: any;
	products: Product[];	
	allProductsSelected: boolean;
	thumbnailFileUrls: String[];	
	mode: Mode = Mode.Edit;
	state: string = 'inactive';
	activeProduct: Product;
	availableColors: string[] = ['red', 'green'];
	sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
	sizeValue: string;

	constructor(public productService: ProductService, @Inject(FirebaseApp) firebaseApp: any) {

		this.firebaseStorage = firebaseApp.storage();		

		var productJson = {
			$key: '',
			id: 'BLIW253',
			name: '',
			price: '0',
			thumbnailFileName: ''
		};
		this.activeProduct = new Product(productJson);
	
		this.products = new Array<Product>();		

		var productJson = {
			$key: 'BLIW253',
			id: 'BLIW253',
			name: 'Skirt',
			price: '450',
			thumbnailFileName: 'BLIW253.jpg'
		};
		var product = new Product(productJson);
		this.products.push(product);
		var productJson = {
			$key: 'BLIW252',
			id: 'BLIW252',
			name: 'Skirt',
			price: '499',
			thumbnailFileName: 'BLIW253.jpg'
		};
		var product = new Product(productJson);
		this.products.push(product);
		var productJson = {
			$key: 'BLIW251',
			id: 'BLIW251',
			name: 'Skirt',
			price: '499',
			thumbnailFileName: 'BLIW253.jpg'
		};
		var product = new Product(productJson);
		this.products.push(product);
		var productJson = {
			$key: 'BLIW250',
			id: 'BLIW250',
			name: 'Skirt',
			price: '499',
			thumbnailFileName: 'BLIW253.jpg'
		};
		var product = new Product(productJson);
		this.products.push(product);
		this.products.push(product);
		this.products.push(product);
		this.products.push(product);
		this.products.push(product);
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

	selectAllProducts() {
		this.products.forEach( item => item.active = ! this.allProductsSelected );
		this.allProductsSelected = ! this.allProductsSelected;
	}

	switchMode() {		
		this.mode = (this.mode == Mode.List) ? Mode.Edit: Mode.List;		
	}

	deleteProducts() {
		console.log('Deleting ...')
		this.products
			.filter(product => product.active)
			.forEach(product => {
				var i = this.products.findIndex(item => item.id == product.id);
				console.log(product);
				this.products.splice(i, 1);
				console.log('Deleted.');
				this.productService.remove(product);
			});
	}

	updateProducts() {
		console.log('Updating ...')
	}

	addProducts() {
		this.products.forEach(product => {
			this.productService.add(product);
		});
	}

	previewSelectedFiles(e: MSInputMethodContext) {

		var productText: string[];
		var productJson: any;		
		var fieldDelimiter: string = '-';
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
