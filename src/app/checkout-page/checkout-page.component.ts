import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { FILTER, SORT } from '../app.enum';
import { AuthGuard } from '../services/auth.service';
import { UserService, AddressService, CardService } from '../services/all-data.service';
import { Address } from "../models/address.model";
import { Card } from "../models/card.model";

@Component({
	selector: 'app-checkout-page',
	templateUrl: './checkout-page.component.html',
	styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

	addressStream: Observable<Address[]>;
	cardStream: Observable<Card[]>;

	ngOnInit() {}
	constructor(private router: Router,
				private authGuard: AuthGuard,				
				private userService: UserService,
				private addressService: AddressService,
				private cardService: CardService)
	{
		this.authGuard.getAuth().subscribe( data => {
			if ( data !== null ) {
				this.userService
					.lookup( data.auth.email, 'email' )
					.subscribe( userJson => {
						this.addressStream = this.addressService.getList( SORT.FOREIGN_KEY, FILTER.EQUAL_TO, userJson.$key );
						this.cardStream = this.cardService.getList( SORT.FOREIGN_KEY, FILTER.EQUAL_TO, userJson.$key );
					});
			};
		});

	}


}
