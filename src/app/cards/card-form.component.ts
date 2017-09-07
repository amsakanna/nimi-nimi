import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { CardService, AddressService } from '../services/all-data.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Card } from '../models/card.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-card-form',
	template: `
		<jam-form title="Card"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="cardService"
				[returnUrl]="returnUrl">
		</jam-form>
	`
})
export class CardFormComponent implements OnInit 
{

	private returnUrl: string;
	private formElements: any[];
	private card: Card;

	ngOnInit() {}

	constructor(private route: ActivatedRoute,
				private userService: UserService,				
				private cardService: CardService,					
				private addressService: AddressService)
	{
		this.returnUrl = '/user/cards';
		this.card = new Card({
			$key: this.route.snapshot.params['key'],
			user: this.userService.user
		});
		
		this.generateFormElements();

		if( this.card.$key != 'new' )
		{
			this.cardService
			.getObject( this.card.$key )
			.subscribe( card => {
				this.card = card;
				this.addressService
				.getObject( this.card.billingAddress.$key )
				.subscribe( address => {
					this.card.billingAddress = address;					
					this.generateFormElements();
				});
			});
		}
	}

	generateFormElements()
	{
		this.formElements = [
			{ key: '$key', exclude: true, initialValue: this.card.$key },
			{ key: 'userKey', exclude: true, initialValue: this.card.user.$key },
			{ key: 'billingAddressKey', exclude: true, initialValue: this.card.billingAddress.$key },
			{ key: 'holderName', exclude: false, initialValue: this.card.holderName, type: 'text', placeHolder: 'Card Holder Name', formControlName: 'holderName', validators: Validators.required },
			{ key: 'number', exclude: false, initialValue: this.card.number, type: 'text', placeHolder: 'Card Number', formControlName: 'number', validators: Validators.required },
			{ key: 'expiryDate', exclude: false, initialValue: this.card.expiryDate, type: 'date', placeHolder: 'Expiry Date', formControlName: 'expiryDate', validators: Validators.required },
			{ key: 'cvv', exclude: false, initialValue: this.card.cvv, type: 'number', placeHolder: 'CVV Number', formControlName: 'cvv', validators: Validators.required },
		];
	}

}
