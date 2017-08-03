import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddressService } from '../services/address.service';
import { AuthGuard } from '../services/auth.service';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';

@Component({
	selector: 'app-address-form',
	template: `
		<jam-form title="Address"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="dataService"
				[returnUrl]="returnUrl">
		</jam-form>
	`
})
export class AddressFormComponent implements OnInit 
{

	private formElements: any[];
	private returnUrl: string;
	private currentUser: User;

	@Input() selectedItem: Address;

	ngOnInit() {}

	constructor(private dataService: AddressService,
				private authGuard: AuthGuard) 
	{
		this.currentUser = this.authGuard.user;
		this.returnUrl = '/user/addresses';
		this.formElements = this.generateFormElements(this.selectedItem);
	}

	generateFormElements(item: Address) : any[]
	{
		if(item === undefined)
			item = new Address();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'userKey', exclude: true, initialValue: this.currentUser ? this.currentUser.$key : '' },
			{ key: 'type', exclude: true, initialValue: item.type },
			{ key: 'name', exclude: false, initialValue: item.name, type: 'text', placeHolder: 'Name', formControlName: 'name' },
			{ key: 'phone', exclude: false, initialValue: item.phone, type: 'text', placeHolder: 'Phone', formControlName: 'phone' },
			{ key: 'pinCode', exclude: false, initialValue: item.pinCode, type: 'text', placeHolder: 'Pin Code', formControlName: 'pinCode' },
			{ key: 'streetAddress', exclude: false, initialValue: item.streetAddress, type: 'text', placeHolder: 'Street Address', formControlName: 'streetAddress', validators: Validators.required },
			{ key: 'city', exclude: false, initialValue: item.city, type: 'text', placeHolder: 'City', formControlName: 'city', validators: Validators.required },
			{ key: 'state', exclude: false, initialValue: item.state, type: 'text', placeHolder: 'State', formControlName: 'state' },
			{ key: 'country', exclude: false, initialValue: item.country, type: 'text', placeHolder: 'Country', formControlName: 'country' }
		];
		return formElements;
	}

}
