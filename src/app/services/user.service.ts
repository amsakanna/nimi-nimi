import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService extends DataService<User> 
{

	protected foreignKeyName = null;
	protected searchKeyName = "email";
	protected tableName: string;

	constructor(db: AngularFireDatabase) 
	{
		super(db, "users");
	}

	protected createModel(json) : User 
	{
		return new User(json);
	}

}
