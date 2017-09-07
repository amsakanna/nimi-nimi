import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService extends DataService<User>
{
    
    public user: User;
    public loadStatus: Observable<boolean>;
    
    constructor(db: AngularFireDatabase,
                private authService: AuthService)
    {
        super(db);
        
        this.loadStatus = this.authService.auth
            .concatMap( auth => {
                if( auth.loggedIn ) {
                    return this.insertIfNew( auth.user, auth.user.email, 'email' )
                    .map( dataServiceObject => {
                        this.user = dataServiceObject.object;
                        return true;
                    });
                } else {
                    return Observable.of( false );
                }
            });

    }
    
	protected createModel(json) : User
	{
		return new User(json);
	} 

}