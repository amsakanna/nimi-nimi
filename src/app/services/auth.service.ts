import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import { LogService } from './log.service';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

	user: User;
	authState: FirebaseAuthState;

	constructor(private logService: LogService,
				private userService: UserService,
				private auth: AngularFireAuth,
				private router: Router)
	{
		this.auth.subscribe(authState => 
		{
			this.authState = authState;
			var user$ = this.getUser();
			if(user$ !== null)
				user$.subscribe( user => this.user = user );
		});
	}

	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, 
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>	
	{		
		return Observable.from(this.auth)
			.take(1)
			.map(state => !!state)
			.do( authenticated => {				
				if( !authenticated ) {
					this.router.navigateByUrl('/auth', { 
						queryParams: { returnUrl: routerStateSnapshot.url }
					});
				}
			});
	}


	login(provider: AuthProviders, returnUrl: string)
	{
		return this.auth
			.login({
				provider: provider,
				method: AuthMethods.Popup
			})
			.then( (data) => {
				this.user = new User({
					$key: '',
					firstName: data.auth.displayName,
					lastName: '',
					email: data.auth.email,
					photo: data.auth.photoURL,
					gender: '',
					rating: 0,
					type: 0
				});
				this.userService.upsert(this.user, this.user.email, 'email');
				this.router.navigateByUrl(returnUrl);
			})
			.catch( (error) => this.logService.dumpVariable('error (from auth service)', error.message) );
	}

	logout()
	{
		return this.auth.logout()
			.then( (data) => console.log('auth-service', 'logged out') )
			.catch( (error) => this.logService.dumpVariable('error', error.message) );
	}

	getAuth(): AngularFireAuth
	{
		return this.auth;
	}

	getUser(): Observable<User>
	{
		if(this.authState !== null)
			return this.userService.lookup(this.authState.auth.email, 'email');
		else
			return null;
	}

}
