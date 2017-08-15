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

		this.navigationList.push(new NavigationItem('/admin/transaction/journal', 'Journal', 'assignment'));
		this.navigationList.push(new NavigationItem('/admin/transaction/inventory', 'Inventory', 'dns'));
		this.navigationList.push(new NavigationItem('/admin/dimension/brand', 'Brand', 'aspect_ratio'));
		this.navigationList.push(new NavigationItem('/admin/dimension/department', 'Department', 'group_work'));
		this.navigationList.push(new NavigationItem('/admin/dimension/product', 'Product', 'card_giftcard'));
		this.navigationList.push(new NavigationItem('/admin/dimension/size', 'Size', 'content_cut'));
		this.navigationList.push(new NavigationItem('/admin/dimension/colour', 'Colour', 'format_color_fill'));
		
		this.navigationList.push(new NavigationItem('/user/profile', 'Profile', 'account_circle', '/user'));
		this.navigationList.push(new NavigationItem('/user/addresses', 'Addresses', 'location_on'));
		this.navigationList.push(new NavigationItem('/user/cards', 'Cards', 'credit_card'));
		this.navigationList.push(new NavigationItem('/user/wish-lists', 'Wish Lists', 'favorite'));
		this.navigationList.push(new NavigationItem('/user/orders', 'Orders', 'playlist_add_check'));

		this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
			this.currentUrl = event.url;
			this.navigationList.forEach( item => {
				item.selected = (item.url == this.currentUrl || item.redirectFromUrl == this.currentUrl);
			});
		});
	}

	public requestRoutes(urls: string[]) : NavigationItem[]
	{
		return this.navigationList.filter(item => urls.doesExist(item.url));
	}



}
