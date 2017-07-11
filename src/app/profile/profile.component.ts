import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterService } from '../services/router.service';
import { NavigationItem } from '../models/navigationItem.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{

	navigationList: NavigationItem[];
	ngOnInit() {}

	constructor(private router: Router,	
				private routerService: RouterService) 
	{
		this.navigationList = this.routerService.requestRoutes([
			'/user/profile',
			'/user/addresses',
			'/user/cards',
			'/user/lists',
			'/user/orders'
		]);
	}

}
