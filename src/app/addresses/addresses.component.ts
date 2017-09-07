import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { AddressService } from '../services/all-data.service';
import { UserService } from '../services/user.service';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { g } from '../app.global';

@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html',
	styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit 
{
	
	private addressStream: Observable<Address[]>;
	public selectedItem: any;

	ngOnInit() {}

	constructor(private addressService: AddressService,
				private userService: UserService)
	{
		this.addressStream = this.addressService.getList( SORT.FOREIGN_KEY, FILTER.EQUAL_TO, this.userService.user.$key );
	}

}
