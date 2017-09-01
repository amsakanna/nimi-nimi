import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterService } from '../services/router.service';
import { AuthService } from '../services/auth.service';
import { NavigationItem } from '../models/navigationItem.model';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit 
{

	navigationList: NavigationItem[];
	ngOnInit() {}

	constructor(private router: Router,	
				private routerService: RouterService,
				private authService: AuthService)
	{
		this.navigationList = this.routerService.requestRoutes([
			'/user/profile',
			'/user/addresses',
			'/user/cards',
			'/user/wish-lists',
			'/user/orders'
		]);
	}

}
