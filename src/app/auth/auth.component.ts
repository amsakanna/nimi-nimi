import { Component, OnInit } from '@angular/core';
import { AuthProviders } from 'angularfire2';
import { AuthService } from '../services/auth.service';
import { Navigator } from '../services/navigator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	private returnUrl: string;
	
	ngOnInit() {}
	
	constructor(private route: ActivatedRoute,
				private authService: AuthService)
	{
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	login( provider: string )
	{		
		this.authService.login( AuthProviders.Google, this.returnUrl );
	}

}
