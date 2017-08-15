import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Card } from '../models/card.model';

@Injectable()
export class CardService extends DataService<Card>
{

	protected foreignKeyName = "userKey";
	protected searchKeyName = "holderName";
	protected tableName: string;

	constructor(db: AngularFireDatabase) 
	{
		super(db, "cards");
	}

	protected createModel(json) : Card 
	{
		return new Card(json);
	}

}
