import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Navigator } from '../services/navigator.service';
import { AuthService } from '../services/auth.service';
import { NavigationItem } from '../models/navigation-item.model';

@Component({
	selector: 'app-admin-page',
	templateUrl: './admin-page.component.html',
	styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit 
{

	navigationList: Array<NavigationItem>;
	ngOnInit() {}

	constructor(private router: Router,	
				private routerService: Navigator,
				private authService: AuthService)
	{
		this.navigationList = new Array<NavigationItem>();
	}

	logout()
	{
		this.authService.logout();
		this.router.navigateByUrl('/home');
	}

}
