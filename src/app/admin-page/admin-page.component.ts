import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
	selector: 'app-admin-page',
	templateUrl: './admin-page.component.html',
	styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  	form: FormGroup;
	defaultFormValues = {
		name: "",
    	price: "0.00",
		thumbnail: ""
	};

	constructor(public fb: FormBuilder,
				public productService: ProductService) {
		this.form = this.fb.group(this.defaultFormValues);
	}

	ngOnInit() {
	}


	reset() {
		this.form.setValue(this.defaultFormValues);
	}

	addProduct() 
	{

		let name = this.form.get('name').value;
		let price = this.form.get('price').value;
		let thumbnail = this.form.get('thumbnail').value;

		if (name == "" || price == "" || thumbnail == "") return;

		let newProductJson = {
			$key: null,
			name: name,
			price: price,
			thumbnail: thumbnail
		};

		let newProduct = new Product(newProductJson);
		this.productService.add(newProduct);
		this.reset();

	}

}
