import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddressService } from '../services/all-data.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-address-form',
	template: `
		<jam-form title="Address"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="addressService"
				[returnUrl]="returnUrl">
		</jam-form>
	`
})
export class AddressFormComponent implements OnInit 
{

	private returnUrl: string;
	private formElements: any[];
	private address: Address;

	ngOnInit() {}

	constructor(private addressService: AddressService,
				private userService: UserService,
				private route: ActivatedRoute) 
	{
		this.returnUrl = '/user/addresses';
		this.address = new Address({
			$key: this.route.snapshot.params['key'],
			user: this.userService.user
		});
		
		this.generateFormElements();

		if( this.address.$key != 'new' )
		{
			this.addressService
			.getObject( this.address.$key )
			.subscribe( address => {
				this.address = address;
				this.generateFormElements();
			});
		}

	}

	generateFormElements()
	{
		this.formElements = [
			{ key: '$key', exclude: true, initialValue: this.address.$key },
			{ key: 'userKey', exclude: true, initialValue: this.address.user.$key },
			{ key: 'type', exclude: true, initialValue: this.address.type },
			{ key: 'name', exclude: false, initialValue: this.address.name, type: 'text', placeHolder: 'Name', formControlName: 'name' },
			{ key: 'phone', exclude: false, initialValue: this.address.phone, type: 'text', placeHolder: 'Phone', formControlName: 'phone' },
			{ key: 'pinCode', exclude: false, initialValue: this.address.pinCode, type: 'text', placeHolder: 'Pin Code', formControlName: 'pinCode' },
			{ key: 'streetAddress', exclude: false, initialValue: this.address.streetAddress, type: 'text', placeHolder: 'Street Address', formControlName: 'streetAddress', validators: Validators.required },
			{ key: 'city', exclude: false, initialValue: this.address.city, type: 'text', placeHolder: 'City', formControlName: 'city', validators: Validators.required },
			{ key: 'state', exclude: false, initialValue: this.address.state, type: 'text', placeHolder: 'State', formControlName: 'state' },
			{ key: 'country', exclude: false, initialValue: this.address.country, type: 'text', placeHolder: 'Country', formControlName: 'country' }
		];
	}

}
