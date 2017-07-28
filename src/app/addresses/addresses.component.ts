import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { AddressService } from '../services/address.service';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../services/auth.service';
import { Address } from '../models/address.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html',
	styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit 
{
	
	private addressStream: Observable<Address[]>;
	private form: FormGroup;
	private formValues: any;
	private formVisible: boolean;
	private selectedItem: any;
	private selected: boolean;

	ngOnInit() {}

	constructor(private addressService: AddressService,
				private userService: UserService,
				private authGuard: AuthGuard,
				private formBuilder: FormBuilder)
	{
		this.authGuard.getAuth().subscribe(data => {
			if ( data !== null ) {
				this.userService.lookup(data.auth.email, 'email').subscribe(user => {
					this.addressStream = this.addressService.getList(SORT.FOREIGN_KEY, FILTER.EQUAL_TO, user.$key);
				});
			}
		});

		this.form = this.formBuilder.group({
			name: ['', Validators.required],
			phone: ['', Validators.required],
			pinCode: ['', Validators.required],
			streetAddress: ['', Validators.required],
			city: ['', Validators.required],
			state: ['Tamil Nadu', Validators.required],
			country: ['India', Validators.required]
		});

	}

	insert() 
	{
		var address = new Address({
			$key: '',
			userKey: '',
			type: '',
			name: this.form.controls['name'].value,
			phone: this.form.controls['phone'].value,
			pinCode: this.form.controls['pinCode'].value,
			streetAddress: this.form.controls['streetAddress'].value,
			city: this.form.controls['city'].value,
			state: this.form.controls['state'].value,
			country: this.form.controls['country'].value
		});

		this.authGuard.getAuth().subscribe(data => {
			if ( data !== null ) {
				this.userService.lookup(data.auth.email, 'email').subscribe(user => {
					address.userKey = user.$key;
					this.addressService.insert(address);
				});
			}
		});
	}

	delete()
	{
		this.addressService.delete(this.selectedItem);
		this.selectedItem = null;
		this.selected = false;		
	}

	edit()
	{
		this.form.patchValue({
			name: this.selectedItem.name,
			phone: this.selectedItem.phone,
			pinCode: this.selectedItem.pinCode,
			streetAddress: this.selectedItem.streetAddress,
			city: this.selectedItem.city,
		});
		this.formVisible = true;
	}

}
