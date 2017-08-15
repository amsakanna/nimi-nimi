import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../services/all-data.service';
import { Card } from '../models/card.model';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

	private item: Card;

	constructor(private route: ActivatedRoute,
				private cardService: CardService)
	{
		var key = this.route.snapshot.params['key'];
		this.cardService.getObject(key).subscribe(object => {
			this.item = object;
		});
	}

	ngOnInit() {
	}

}
