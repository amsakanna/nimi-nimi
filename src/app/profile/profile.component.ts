import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { AuthService } from '../services/auth.service';
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

	constructor(private authService: AuthService)
	{
		this.user = this.authService.user;
	}

}
