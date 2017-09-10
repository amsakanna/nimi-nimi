import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Navigator } from './navigator.service';
import { MetaService } from "./meta.service";
import { TileSizeService } from "./all-data.service";
import { User } from '../models/user.model';


@Injectable()
export class AuthGuard implements CanActivate
{

	constructor(private router: Router,
				private authService: AuthService) {}

	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, 
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>
	{
		// Get authentication
		return this.authService.authenticated.take( 1 )
		// if not authenticated, route to auth page.
		.do( authenticated => {
			console.log( 'auth guard let me in ?', authenticated );
			if( ! authenticated ) {
				this.router.navigateByUrl( '/auth', { queryParams: { returnUrl: routerStateSnapshot.url } });
			}
		});
	}

}

@Injectable()
export class UserGuard implements CanActivate
{

	constructor(private router: Router,
				private userService: UserService) {}

	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>
	{
		// Check if user is loaded from database
		return this.userService.loadStatus.take( 1 ).do( loaded => {
			console.log( 'user loaded ?', loaded );
		});
	}
	
}

@Injectable()
export class InterfaceDataGuard implements CanActivate
{
	
	constructor(private router: Router,
				private navigator: Navigator,
				private tileSizeService: TileSizeService) {}
		
	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>
	{
		// Check if navigation data is loaded
		return this.navigator.loadStatus.asObservable().take( 1 )
		.concatMap( navigationLoaded => this.tileSizeService.loadStatus.asObservable().take( 1 ) )
		.do( loaded => {
			console.log( 'nav loaded ?', loaded );
		});
	}

}

@Injectable()
export class MetaGuard implements CanActivate
{

	constructor(private router: Router,
				private metaService: MetaService) {}

	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>
	{
		// Check if navigation data is loaded
		return this.metaService.loadStatus.asObservable().take( 1 );
	}

}