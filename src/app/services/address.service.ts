import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Address } from '../models/address.model';

@Injectable()
export class AddressService extends DataService<Address> 
{

	protected foreignKeyName = "userKey";
	protected searchKeyName = "streetAddress";
	protected tableName: string;

	constructor()
	{
		super();
	}

	protected createModel(json) : Address 
	{
		return new Address(json);
	}

}
