import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AngularFireAuth, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { EVENT } from "../app.enum";
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { Navigator } from "./navigator.service";
import { AuthEvent } from "../models/event.model";

@Injectable()
export class AuthService
{

	auth: Observable<Auth>;
	authenticated: Observable<boolean>;

	constructor(private router: Router,
				private angularFireAuth: AngularFireAuth,
				private navigator: Navigator)
	{

		this.auth = this.angularFireAuth
			.asObservable()
			.map( authState => {
				return new Auth({
					loggedIn: !! authState,
					user: this.createUser( authState )
				});
			});
		
		this.authenticated = this.angularFireAuth
			.asObservable()
			.map( authState => !! authState );
		
	}

	createUser( authState: FirebaseAuthState ) : User
	{
		return new User({
			firstName: authState ? authState.auth.displayName : '',
			email: authState ? authState.auth.email : '',
			photo: authState ? authState.auth.photoURL : '',
		});
	}

	login(provider: AuthProviders, returnUrl: string)
	{
		this.angularFireAuth
		.login({
			provider: provider,
			method: AuthMethods.Popup
		})
		.then( authState => {
			this.navigator.event.next( new AuthEvent( { name: EVENT.LOG_IN, returnUrl: returnUrl } ) );
		})
		.catch( (error: any) => {
			alert( error.code + '\n' + error.message );
		});
	}

	logout()
	{
		this.angularFireAuth.logout()
		.then( () => {
			this.navigator.event.next( new AuthEvent( { name: EVENT.LOG_OUT } ) );
		});
	}

}