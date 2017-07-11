import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationItem } from '../models/navigationItem.model';

@Injectable()
export class RouterService
{

	private navigationList: NavigationItem[];
	public currentUrl: string;

	constructor(private router: Router)
	{
		
		this.navigationList = new Array<NavigationItem>();

		this.navigationList.push(new NavigationItem('/admin/journal', 'Journal', 'assignment'));
		this.navigationList.push(new NavigationItem('/admin/inventory', 'Inventory', 'dns'));
		this.navigationList.push(new NavigationItem('/admin/definition/brand', 'Brand', 'aspect_ratio'));
		this.navigationList.push(new NavigationItem('/admin/definition/department', 'Department', 'group_work'));
		this.navigationList.push(new NavigationItem('/admin/definition/product', 'Product', 'card_giftcard'));
		
		this.navigationList.push(new NavigationItem('/user/profile', 'Profile', 'account_circle'));
		this.navigationList.push(new NavigationItem('/user/addresses', 'Addresses', 'location_on'));
		this.navigationList.push(new NavigationItem('/user/cards', 'Cards', 'credit_card'));
		this.navigationList.push(new NavigationItem('/user/wish-lists', 'Wish Lists', 'favorite'));
		this.navigationList.push(new NavigationItem('/user/orders', 'Orders', 'playlist_add_check'));

		this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
			this.currentUrl = event.url;
			this.navigationList.forEach( item => item.selected = (item.link == this.currentUrl) );
		});
	}

	public requestRoutes(links: string[]) : NavigationItem[]
	{
		return this.navigationList.filter(item => links.doesExist(item.link));
	}



}
