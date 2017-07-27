import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';
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
				private routerService: RouterService) 
	{
		this.navigationList = this.routerService.requestRoutes([
			'/admin/journal',
			'/admin/inventory',
			'/admin/definition/brand',
			'/admin/definition/department',
			'/admin/definition/product',
		]);
	}

}
