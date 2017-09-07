import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from "rxjs/Rx";
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { SORT, FILTER, EVENT } from "../app.enum";
import { NavigationItemService } from "./all-data.service";
import { NavigationItem } from '../models/navigation-item.model';
import { AuthEvent } from '../models/event.model';

@Injectable()
export class Navigator
{

	public loadStatus: ReplaySubject<boolean>;
	public navigationList: Array<NavigationItem>;
	public navigationState: ReplaySubject<{ curr: NavigationItem, parent: NavigationItem, grandParent: NavigationItem }>;
	public event: ReplaySubject<AuthEvent>;
	public navigationEvent: ReplaySubject<NavigationItem>;
	public authNavigationItem: NavigationItem;

	protected createModel( json ) : NavigationItem { return new NavigationItem(json); }

	constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
				private navigationItemService: NavigationItemService)
	{
		var navigationItemStream: Observable<NavigationItem[]>;

		this.navigationList = Array<NavigationItem>();
		this.loadStatus = new ReplaySubject();
		this.navigationState = new ReplaySubject();
		this.event = new ReplaySubject();
		this.navigationEvent = new ReplaySubject();

		this.event.subscribe( event => {
			switch ( event.name ) {
				case EVENT.LOG_IN:
					this.router.navigateByUrl( event.returnUrl );						
					break;
				case EVENT.LOG_OUT:
					this.router.navigateByUrl( event.returnUrl );
					break;
				default:
					break;
			}
		});

		this.navigationEvent.subscribe( navigationItem => {
			if( navigationItem && navigationItem.link )
				this.router.navigateByUrl( navigationItem.link );
		});

		this.navigationItemService
		.getList( SORT.NONE, FILTER.NONE )
		.subscribe( list => {
			this.navigationList = list;
			this.authNavigationItem = this.navigationList.find( navigationItem => navigationItem.$key == 'auth');
			this.loadStatus.next( true );
		});

		this.loadStatus.subscribe( loaded => {

			if( ! loaded ) return;

			this.router.events
			.filter( event => event instanceof NavigationEnd)
			.subscribe( ( event: NavigationEnd ) => {

				var currentNavigationItem: NavigationItem;
				var parentNavigationItem: NavigationItem;
				var grandParentNavigationItem: NavigationItem;
				var currentUrl: string;
				var currentRoute: ActivatedRoute;
				
				currentRoute = this.activatedRoute.root;				
				currentUrl = event.urlAfterRedirects;

				while ( currentRoute.children[0] )
					currentRoute = currentRoute.children[0];
				var currentParams = currentRoute.snapshot.params;

				Object.keys( currentParams ).forEach( key => {
					currentUrl = currentUrl.replace( currentParams[key], ':' + key );				
				});

				currentNavigationItem = NavigationItem.match( currentUrl, this.navigationList );
				currentNavigationItem.setParent( this.navigationList );
				currentNavigationItem.parent.setParent( this.navigationList );

				currentNavigationItem.setChildren( this.navigationList );
				currentNavigationItem.parent.setChildren( this.navigationList );
				currentNavigationItem.parent.parent.setChildren( this.navigationList );

				this.navigationList.forEach( navigationItem => navigationItem.selected = false );

				currentNavigationItem.selected = true;
				currentNavigationItem.parent.selected = true;
				currentNavigationItem.parent.parent.selected = true;

				this.navigationState.next({
					curr: currentNavigationItem,
					parent: currentNavigationItem.parent,
					grandParent: currentNavigationItem.parent.parent
				});
	
			});
		});
		
	}

}
