import { Component, OnInit } from '@angular/core';
import { ProductService, CartItemService, UserService } from '../services/all-data.service';
import { AuthGuard } from '../services/auth.service';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { Cart } from '../models/cart.model';
import { User } from '../models/user.model';
import { FILTER, SORT } from '../app.enum';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
	
	private cart: Cart;
	private formGroupList: FormGroup[];
	private hoveredIndex: number = -1;
	private total: number = 0;

	ngOnInit() {}
	constructor(private productService: ProductService,
				private cartItemService: CartItemService,
				private userService: UserService,
				private authGuard: AuthGuard,
				private formBuilder: FormBuilder)
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
								this.formGroupList = new Array<FormGroup>();
								cartItemList.forEach( cartItem => {
									this.formGroupList[cartItem.$key] = this.formBuilder.group({
										units: cartItem.units
									});									
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

	updateUnits(cartItem: CartItem)
	{
		let newCartItem = { 
			$key: cartItem.$key,							
			userKey: this.cart.user.$key,
			productKey: cartItem.product.$key,
			units: this.formGroupList[cartItem.$key].controls['units'].value
		};
		this.cartItemService.update( newCartItem );						
	}

	delete(cartItem: CartItem)
	{
		this.cartItemService.delete(cartItem);
	}

	checkout()
	{

	}

}
