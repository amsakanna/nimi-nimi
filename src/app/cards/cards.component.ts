import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { CardService } from '../services/all-data.service';
import { UserService } from '../services/all-data.service';
import { AuthGuard } from '../services/auth.service';
import { Card } from '../models/card.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit 
{

	private cardStream: Observable<Card[]>;

	ngOnInit() {}

	constructor(private cardService: CardService,
				private userService: UserService,
				private authGuard: AuthGuard)
	{
		this.authGuard.getAuth().subscribe(data => {
			if ( data !== null ) {
				this.userService.lookup(data.auth.email, 'email').subscribe(userJson => {
					this.cardStream = this.cardService.getList(SORT.FOREIGN_KEY, FILTER.EQUAL_TO, userJson.$key);
				});
			}
		});
	}

}
