import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ProductService, PictureService, BrandService, CartItemService } from '../services/all-data.service';
import { FILTER, SORT } from '../app.enum';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

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
				private brandService: BrandService,
				private pictureService: PictureService,
				private cartItemService: CartItemService,
				private userService: UserService,
				private authService: AuthService)
	{
		var key = this.route.snapshot.params['key'];
		this.productService
			.getObject( key )
			.subscribe( product => {
				this.product = product;
				this.pictureService
					.getObject( product.picture.$key )
					.subscribe( picture => this.product.picture = picture );
				this.brandService
					.getObject( product.brand.$key )
					.subscribe( brand => this.product.brand = brand );
			});
	}

	addToCart()
	{
		var newCartItem = {
			$key: this.authService.user.$key + this.product.$key,
			userKey: this.authService.user.$key,
			productKey: this.product.$key,
			units: 1
		};
		this.cartItemService
			.getObject( newCartItem.$key )
			.subscribe( cartItem => {
				newCartItem.units = cartItem.units + 1
				this.cartItemService
					.upsert( newCartItem, newCartItem.$key )
					.subscribe( () => {
						alert('Item added to cart. Total units: ' + newCartItem.units);
					});
			});
	}

}
