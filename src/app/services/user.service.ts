import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from './data.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService extends DataService<User>
{

	public user: User;

	constructor(db: AngularFireDatabase)
	{
		super(db);
	}

	// canActivateChild(activatedRouteSnapshot: ActivatedRouteSnapshot, 
	// 			routerStateSnapshot: RouterStateSnapshot) : Promise<boolean>
	// {

	// 	return this.authService
	// 	.canActivate(activatedRouteSnapshot, routerStateSnapshot)
	// 	.then( authenticated => {
	// 		console.log( 'authenticated', authenticated );
    //         if( authenticated ) {
	// 			return this
	// 			.insertIfNew( this.user, this.user.email, 'email' )
	// 			.map( dataServiceObject => {
	// 				this.user = dataServiceObject.object;
	// 				this.authService.user = this.user;
	// 				console.log( 'canActivate User observable', this.authService.user );
	// 				return true;
	// 			}).toPromise();
    //         } else {
	// 			return Promise.resolve( false );
	// 		}
	// 	});
		
	// 	// this.user = this.authService.user;
	// 	// console.log( 'canActivate User', this.user );

	// 	// return this
	// 	// .insertIfNew( this.user, this.user.email, 'email' )
	// 	// .map( dataServiceObject => {
	// 	// 	this.user = dataServiceObject.object;
	// 	// 	this.authService.user = this.user;
	// 	// 	console.log( 'canActivate User observable', this.authService.user );
	// 	// 	return true;
	// 	// });

	// }
	
	protected createModel(json) : User
	{
		return new User(json);
	}
	
}