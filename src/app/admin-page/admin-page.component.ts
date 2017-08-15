import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterService } from '../services/router.service';
import { AuthGuard } from '../services/auth.service';
import { NavigationItem } from '../models/navigationItem.model';

@Component({
	selector: 'app-admin-page',
	templateUrl: './admin-page.component.html',
	styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit 
{

	navigationList: NavigationItem[];
	ngOnInit() {}

	constructor(private router: Router,	
				private routerService: RouterService,
				private authGuard: AuthGuard)
	{
		this.navigationList = this.routerService.requestRoutes([
			'/admin/transaction/inventory',
			'/admin/transaction/journal',
			'/admin/dimension/brand',
			'/admin/dimension/department',
			'/admin/dimension/product',
			'/admin/dimension/size',
			'/admin/dimension/colour'
		]);
	}

	logout()
	{
		this.authGuard.logout();
		this.router.navigateByUrl('/home');
	}

}
