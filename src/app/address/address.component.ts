import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../services/all-data.service';
import { Address } from '../models/address.model';

@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

	private item: Address;

	constructor(private route: ActivatedRoute,
				private addressService: AddressService)
	{
		var key = this.route.snapshot.params['key'];
		this.addressService.getObject(key).subscribe( object => this.item = object );
	}

	ngOnInit() {
	}

}
