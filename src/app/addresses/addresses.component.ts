import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { AddressService } from '../services/all-data.service';
import { AuthService } from '../services/auth.service';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { UserService } from "../services/user.service";

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
				private authService: AuthService,
				private userService: UserService)
	{
		this.addressStream = this.addressService.getList(SORT.FOREIGN_KEY, FILTER.EQUAL_TO, this.authService.user.$key);
	}

}
