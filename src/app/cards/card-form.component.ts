import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { CardService } from '../services/all-data.service';
import { AuthGuard } from '../services/auth.service';
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

	private formElements: any[];
	private returnUrl: string;
	private currentUser: User;
	private item: Card;

	ngOnInit() {}

	constructor(private cardService: CardService,
				private authGuard: AuthGuard,
				private route: ActivatedRoute) 
	{
		this.returnUrl = '/user/cards';
		this.formElements = this.generateFormElements(this.item);

		var key = this.route.snapshot.params['key'];
		this.authGuard.getUser().subscribe(user => 
		{
			this.currentUser = user;
			if(key == 'new')
			{
				this.formElements = this.generateFormElements(this.item);
			} else
			{
				this.cardService.getObject(key).subscribe(object => 
				{
					this.item = object;
					this.formElements = this.generateFormElements(this.item);
				});
			}
		});
	}

	generateFormElements(item: Card) : any[]
	{
		if(item === undefined)
			item = new Card();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'userKey', exclude: true, initialValue: this.currentUser ? this.currentUser.$key : '' },
			{ key: 'billingAddressKey', exclude: true, initialValue: item.billingAddressKey },
			{ key: 'holderName', exclude: false, initialValue: item.holderName, type: 'text', placeHolder: 'Card Holder Name', formControlName: 'holderName', validators: Validators.required },
			{ key: 'number', exclude: false, initialValue: item.number, type: 'text', placeHolder: 'Card Number', formControlName: 'number', validators: Validators.required },
			{ key: 'expiryDate', exclude: false, initialValue: item.expiryDate, type: 'date', placeHolder: 'Expiry Date', formControlName: 'expiryDate', validators: Validators.required },
			{ key: 'cvv', exclude: false, initialValue: item.cvv, type: 'number', placeHolder: 'CVV Number', formControlName: 'cvv', validators: Validators.required },
		];
		return formElements;
	}

}
