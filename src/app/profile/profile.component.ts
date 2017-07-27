import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../services/auth.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{

	private userStream: Observable<User>;
	private user: User;
	private formVisible: boolean;

	ngOnInit() {}

	constructor(private userService: UserService,
				private authGuard: AuthGuard)
	{
		this.user = new User({
			$key: '',
			firstName: '',
			lastName: '',
			email: '',
			photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif',
			gender: '',
			rating: 0,
			type: 0					
		});
		this.authGuard.getAuth().subscribe(auth => {
			if(auth !== null) {
				this.userService.lookup(auth.auth.email, 'email').subscribe(user => this.user = user);
			}
		});
	}

}
