import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from './data.service';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService extends DataService<Product> {

	protected foreignKeyName = null;
	protected searchKeyName = "id";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "products");
	}

	protected createModel(json): Product {
		return new Product(json);
	}

}
