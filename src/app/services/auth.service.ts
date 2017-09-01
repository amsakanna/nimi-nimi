import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthService implements CanActivate {

	user: User;

	constructor(private router: Router,
				private auth: AngularFireAuth,
				private userService: UserService) {}

	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, 
				routerStateSnapshot: RouterStateSnapshot): Observable<boolean>
	{

		this.resetUser();

		return this.auth
		.asObservable()
		.map( authState => {
			let authenticated = this.createUser( authState );
			return { authenticated: authenticated, user: this.user };
		})
		.concatMap( auth => {
			if( auth.authenticated ) {
				return this.userService
				.insertIfNew( auth.user, auth.user.email, 'email' )
				.map( dataServiceObject => {
					this.user = dataServiceObject.object;
					return true;
				});
			} else {
				return Observable.of( false );
			}
		})
		.do( authenticated => {
			if( ! authenticated ) {
				this.router.navigateByUrl( '/auth', { 
					queryParams: { returnUrl: routerStateSnapshot.url }
				});
			}
		});

	}

	createUser( authState: FirebaseAuthState ) : boolean
	{
		if( ! authState ) {
			this.resetUser();
			return false;
		}

		this.user = new User({
			firstName: authState.auth.displayName,
			email: authState.auth.email,
			photo: authState.auth.photoURL,
		});

		return true;
		
	}

	resetUser() {
		this.user = new User();
	}

	login(provider: AuthProviders, returnUrl: string)
	{
		return this.auth
		.login({
			provider: provider,
			method: AuthMethods.Popup
		})
		.then( authState => {
			this.createUser( authState );
			this.router.navigateByUrl( returnUrl );
		});
	}

	logout() : Promise<any>
	{
		return this.auth.logout()
		.then( () => {
			this.resetUser();
			this.router.navigateByUrl('/');
		});
	}

}
