import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { AddressService } from '../services/address.service';
import { AuthGuard } from '../services/auth.service';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html',
	styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit 
{
	
	private addressStream: Observable<Address[]>;
	private selectedItem: any;
	private user: User;

	ngOnInit() {}

	constructor(private addressService: AddressService,
				private authGuard: AuthGuard)
	{
		this.authGuard.getUser().subscribe(user => {
			this.user = user
			this.addressStream = this.addressService.getList(SORT.FOREIGN_KEY, FILTER.EQUAL_TO, user.$key);
		});
	}

}
