import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { FILTER, SORT } from '../models/constants';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

	private productStream: Observable<any[]>;

	constructor(private productService: ProductService) {
		this.productStream = this.productService.getList(SORT.NONE, FILTER.NONE, undefined);
	}

	ngOnInit() {
	}

}
