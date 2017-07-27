import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FILTER, SORT } from '../app.enum';
import { BrandService } from '../services/brand.service';
import { Brand } from '../models/brand.model';
import { Observable } from 'rxjs';
import "rxjs/add/operator/first";

@Component({
	selector: 'app-brand',
	templateUrl: './brand.component.html',
	styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

	brand: Brand;
  	brandForm: FormGroup;
	routeId: string;

	constructor(private route: ActivatedRoute, 
				private router: Router,
				private formBuilder: FormBuilder,
				private brandService: BrandService) 
	{
		this.newForm();
	}

	ngOnInit() {		
		this.route.params.subscribe((params: Params) =>  {
			this.routeId = params['id'];
			if(this.routeId == "null") this.newForm();
			this.brandService.getList(SORT.SEARCH_KEY, FILTER.EQUAL_TO, this.routeId)
				.first().subscribe(brands => brands.forEach(brand => {
					this.brand = brand;
					this.brandForm.setValue({
						name: brand.name,
						rating: brand.rating
					});
				}));
		});
	}

	newForm() {
		this.brandForm = this.formBuilder.group({
			name: ['', Validators.required],
			rating: [{value: 0, disabled: true}]
		});
		this.brand = new Brand({$key: '', name: '', rating: 0});
	}

	submitForm() {
		var brand: Brand = new Brand ({
			$key: this.brand.$key,
			name: this.brandForm.get('name').value,
			rating: this.brandForm.get('rating').value
		});
		this.brandService.upsert(brand, this.brand.name);
	}

	removeBrand() {
		this.brandService.delete(this.brand);
	}

}
