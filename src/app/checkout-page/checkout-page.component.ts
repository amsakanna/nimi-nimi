import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { FILTER, SORT } from '../app.enum';
import { AuthGuard } from '../services/auth.service';
import { UserService, AddressService, CardService } from '../services/all-data.service';
import { DefaultService } from '../services/default.service';
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
	checkoutAddress: Address;
	checkoutCard: Card;
	showList: Array<boolean> = new Array<boolean>();

	ngOnInit() {}
	constructor(private router: Router,
				private authGuard: AuthGuard,				
				private userService: UserService,
				private defaultService: DefaultService,
				private addressService: AddressService,
				private cardService: CardService)
	{
		this.authGuard.getAuth().subscribe( data => {
			if ( data !== null ) {
				this.userService
					.lookup( data.auth.email, 'email' )
					.subscribe( userJson => {
						this.defaultService
							.subject( 'User' )
							.getObject( userJson.$key )
							.subscribe( defaultData => {
								this.addressService
									.getObject( defaultData.Address )
									.subscribe( address => this.checkoutAddress = address );
								this.cardService
									.getObject( defaultData.Card )
									.subscribe( card => this.checkoutCard = card );
							});
						this.addressStream = this.addressService.getList( SORT.FOREIGN_KEY, FILTER.EQUAL_TO, userJson.$key );
						this.cardStream = this.cardService.getList( SORT.FOREIGN_KEY, FILTER.EQUAL_TO, userJson.$key );
					});
			};
		});

	}

	listAction( action: string, target: string )
	{
		switch ( action )
		{			
			case 'show':
				this.showList[target] = true;
				break;
			case 'hide':
				this.showList[target] = false;
				break;
			case 'toggle':
				this.showList[target] = ! this.showList[target];
				break;
			default:
				this.showList[target] = ! this.showList[target];
				break;
		}
	}

	select(item: any)
	{
		let target = item.constructor.name;
		switch ( target )
		{			
			case 'Address':
				this.checkoutAddress = item;
				break;
			case 'Card':
				this.checkoutCard = item;
				break;
			default:
				break;
		}
		this.listAction( 'hide', target );
	}


}
