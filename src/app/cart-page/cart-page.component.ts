import { Component, OnInit } from '@angular/core';
import { ProductService, CartItemService, UserService } from '../services/all-data.service';
import { AuthGuard } from '../services/auth.service';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { Cart } from '../models/cart.model';
import { User } from '../models/user.model';
import { FILTER, SORT } from '../app.enum';
import { Router } from "@angular/router";

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
	
	private cart: Cart;
	private hoveredIndex: number = -1;
	private selectedIndex: number = -1;
	private total: number = 0;

	ngOnInit() {}
	constructor(private productService: ProductService,
				private cartItemService: CartItemService,
				private userService: UserService,
				private authGuard: AuthGuard,
				private router: Router)
	{
		this.cart = new Cart();
		this.authGuard.getAuth().subscribe( data => {
			if ( data !== null ) {
				this.userService
					.lookup( data.auth.email, 'email' )
					.subscribe( userJson => {
						this.cart.user = new User(userJson);
						this.cartItemService
							.getList(SORT.FOREIGN_KEY, FILTER.EQUAL_TO, this.cart.user.$key)
							.subscribe( cartItemList => {
								cartItemList.forEach( cartItem => {
									this.productService
										.getObject( cartItem.product.$key )
										.subscribe( product => {
											cartItem.product = product;
										});
								});
								this.cart.items = cartItemList;
							});
					});
			};
		});
	}

	updateUnits(cartItem: CartItem, value: number)
	{
		let newUnits = cartItem.units + value;
		newUnits = newUnits >= 1 ? newUnits : 1;
		let newCartItem = { 
			$key: cartItem.$key,							
			userKey: this.cart.user.$key,
			productKey: cartItem.product.$key,
			units: newUnits
		};
		this.cartItemService.update( newCartItem );						
	}

	delete(cartItem: CartItem)
	{
		this.cartItemService.delete(cartItem);
	}

	checkout()
	{
		this.router.navigate(['/checkout']);
	}

}
