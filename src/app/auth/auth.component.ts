import { Component, OnInit } from '@angular/core';
import { AuthProviders } from 'angularfire2';
import { LogService } from '../services/log.service';
import { AuthService } from '../services/auth.service';
import { Navigator } from '../services/navigator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { EVENT } from '../app.enum';
import { AuthEvent } from "../models/event.model";

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	private returnUrl: string;
	private loading: boolean;
	
	ngOnInit() {}
	
	constructor(private route: ActivatedRoute,
				private router: Router,
				private logService: LogService,
				private authService: AuthService,
				private navigator: Navigator)
	{
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	login( provider: string )
	{		
		this.authService.login( AuthProviders.Google, this.returnUrl );
	}

}
