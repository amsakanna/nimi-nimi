import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Brand } from '../models/brand.model';

@Injectable()
export class BrandService extends DataService<Brand> {

	protected foreignKeyName = null;
	protected searchKeyName = "name";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "brands");
	}

	protected createModel(json): Brand {
		return new Brand(json);
	}

}
