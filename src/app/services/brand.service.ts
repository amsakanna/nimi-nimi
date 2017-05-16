import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Brand } from '../models/brand.model';

@Injectable()
export class BrandService extends DataService {

	protected createModel = (json) => new Brand(json);
	protected foreignKeyName = null;
	protected searchKeyName = "name";

	constructor(db: AngularFireDatabase) {
		super(db, "brands");
	}

}
