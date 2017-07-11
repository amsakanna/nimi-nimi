import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html',
	styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit 
{
	
	private addressStream: Observable<Address[]>;	

	ngOnInit() {}

	constructor(private addressService: AddressService)
	{
		this.addressStream = this.addressService.getList(SORT.KEY, FILTER.NONE, undefined);
	}


}
