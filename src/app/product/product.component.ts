import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FILTER, SORT } from '../app.enum';
import { Observable } from 'rxjs';
import "rxjs/add/operator/first";
import { FirebaseApp } from 'angularfire2';
import { ColorPickerService  } from 'angular2-color-picker';
import { ProductService } from '../services/product.service';
import { DepartmentService } from '../services/department.service';
import { BrandService } from '../services/brand.service';
import { Product } from '../models/product.model';
import { Department } from '../models/department.model';
import { Brand } from '../models/brand.model';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	firebaseStorage: any;
	product: Product;
  	productForm: FormGroup;
	routeId: string;
	departmentStream: Observable<Department[]>
	brandStream: Observable<Brand[]>
	
	constructor(private route: ActivatedRoute, 
				private router: Router,
				private formBuilder: FormBuilder,
				@Inject(FirebaseApp) firebaseApp: any,
				private productService: ProductService,
				private departmentService: DepartmentService,
				private brandService: BrandService) 
	{
		this.newForm();
		this.departmentStream = departmentService.getList(SORT.NONE, FILTER.NONE, undefined);
		this.brandStream = brandService.getList(SORT.NONE, FILTER.NONE, undefined);

		// this.firebaseStorage = firebaseApp.storage();		

		// var fileLocation = this.firebaseStorage.ref('thumbnails/products/' + product.thumbnailFileName);			
		// fileLocation.getDownloadURL().then((url: string) => {
		// 	this.products[0].thumbnailUrl = url;
		// });

	}

	ngOnInit() {		
		this.route.params.subscribe((params: Params) =>  {
			this.routeId = params['id'];
			if(this.routeId == "null") this.newForm();
			this.productService.getList(SORT.SEARCH_KEY, FILTER.EQUAL_TO, this.routeId)
			.first().subscribe(products => products.forEach(product => {
				this.product = product
				this.productForm.setValue({
					name: product.name,
					department: product.department,
					brand: ''
				});
			}));
		});
	}


	newForm() {
		this.productForm = this.formBuilder.group({			
			name: ['', Validators.required],
			units: [0],
			price: [0],
			department: ['Clothing'],
			brand: ['Sony']
		});
		this.product = new Product({$key: '', name: '', department: '', brand: '', thumbnailFileName: ''});
	}

	submitForm() {
		var product: Product = new Product ({
			$key: this.product.$key,
			name: this.productForm.get('name').value,
			department: this.productForm.get('department').value,
			brand: this.productForm.get('brand').value,
			thumbnailFileName: ''			
		});
		this.productService.upsert(product, this.product.name, 'name');
	}

	removeproduct() {
		this.productService.delete(this.product);
	}

	showFileDialog() {
		document.getElementById('fileUploader').click();
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
		var products = new Array<Product>();

		// Loop through selected files
		for(var i = 0; i < thumbnailFiles.length; i++) {
			thumbnailFile = thumbnailFiles[i];

			// Split file name by delimiter
			productText = thumbnailFile.name.split(fieldDelimiter);
			id = productText[2].split('.')[0];
			
			// Create product model
			productJson = {
				$key: id,
				name: productText[0],
				thumbnailFileName: productText[2]				
			};			
			product = new Product(productJson);

			// Add product attributes
			product.thumbnailFile = thumbnailFile;

			// Add product to list
			products.push(product);
		
			// Upload file to server
			fileLocation = this.firebaseStorage.ref('thumbnails/products/' + product.thumbnailFileName);			
			fileLocation.put(product.thumbnailFile).then((snapshot) => {
				var uploadedFileLocation = this.firebaseStorage.ref(snapshot.metadata.fullPath);				
				uploadedFileLocation.getDownloadURL().then((url: string) => {
					var idFromUrl = url.split('products%2F')[1];
					idFromUrl = idFromUrl.split('.')[0];
					for(var j=0; j<products.length; j++) {
						var product = products[j];
						if(product.$key == idFromUrl) {
							product.thumbnailUrl = url;
							break;
						}
					}				
				});
			});
		}

	}

}
