import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from './data.service';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService extends DataService {

	protected createModel = (json) => new Product(json);
	protected foreignKeyName = null;
	protected searchKeyName = "id";

	constructor(db: AngularFireDatabase) {
		super(db, "products");
	}

}
