import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService, PictureService } from '../services/all-data.service';
import { FILTER, SORT } from '../app.enum';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

	private product: Product;

	ngOnInit() {}
	constructor(private route: ActivatedRoute,
				private productService: ProductService,
				private pictureService: PictureService)
	{
		var key = this.route.snapshot.params['key'];
		this.productService
			.getObject( key ).take(1)
			.subscribe( product => {
				// get pictures for product
				this.pictureService
					.getObject( product.picture.$key ).take(1)
					.subscribe( picture => {
						product.picture = picture;
						this.product = product;
					});
			});
	}

}
