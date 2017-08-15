import { Component, OnInit } from '@angular/core';
import { AuthProviders } from 'angularfire2';
import { LogService } from '../services/log.service';
import { AuthGuard } from '../services/auth.service';
import { UserService } from '../services/all-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';


@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	private returnUrl: string;
	private loading: boolean;

	constructor(private logService: LogService,
				private authGuard: AuthGuard,
				private route: ActivatedRoute,
				private router: Router, private userService: UserService)
	{
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
		// var user = new User({
		// 	$key: '',
		// 	firstName: 'Susaritha 12',
		// 	lastName: '',
		// 	email: 'susaritha12@gmail.com',
		// 	photo: 'https://lh6.googleusercontent.com/-7S7zAL3AuBY/AAAAAAAAAAI/AAAAAAAAACg/Iz8THoG04JY/photo.jpg',
		// 	gender: '',
		// 	rating: 0,
		// 	type: 0
		// });
		// console.log('authService', 'user', user);
		// this.userService.upsert(user, user.email);
	}

	ngOnInit() {
	}

	login(provider: string)
	{
		this.loading = true;
		this.authGuard.login(AuthProviders.Google, this.returnUrl)
			.then( (data) => {
				this.loading = false;
			})
			.catch( (error) => {
				this.loading = false;
			});
	}

}
