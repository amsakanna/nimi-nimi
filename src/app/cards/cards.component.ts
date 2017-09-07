import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { CardService } from '../services/all-data.service';
import { UserService } from '../services/user.service';
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
				private userService: UserService)
	{
		this.cardStream = this.cardService.getList(SORT.FOREIGN_KEY, FILTER.EQUAL_TO, this.userService.user.$key);
	}

}
