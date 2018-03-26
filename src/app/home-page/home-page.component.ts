import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { FILTER, SORT } from '../app.enum';
import { Navigator } from '../services/navigator.service';
import { AuthService } from '../services/auth.service';
import { g } from '../app.global';
import { NavigationItem } from "../models/navigation-item.model";

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit
{

	private meta: any;
	private menu: Array<NavigationItem>;
	private parentMenu: Array<NavigationItem>;

	ngOnInit() {}
	constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
				private authService: AuthService,
				private navigator: Navigator)
	{
		this.meta = g.meta;

		// this.authService.auth.subscribe( auth =>
		// 	this.navigator.authNavigationItem.text = auth.loggedIn ? 'logout' : 'login'
		// );

		this.navigator.navigationState.subscribe( ( { curr, parent, grandParent } ) => {
			this.menu = parent.children;
			this.parentMenu = grandParent.children;
		});
	}

	select( navigationItem: NavigationItem )
	{
		if( navigationItem.$key == 'auth' && navigationItem.text == 'logout' ) {
			this.authService.logout();
		} else {
			this.navigator.navigationEvent.next( navigationItem );
		}
	}

	search( text )
	{		
		this.router.navigate(['/products'], { queryParams: { keyword: text } });
	}


}
