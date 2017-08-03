import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { AuthGuard } from '../services/auth.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{

	private user: User;

	ngOnInit() {}

	constructor(private authGuard: AuthGuard)
	{
		this.user = new User({
			$key: '',
			firstName: '',
			lastName: '',
			email: '',
			photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif',
			gender: '',
			rating: 0,
			type: 0					
		});
		this.authGuard.getUser().subscribe( user => this.user = user );
	}

}
