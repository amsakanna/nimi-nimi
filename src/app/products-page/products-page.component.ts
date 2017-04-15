import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Query } from 'angularfire2/interfaces';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

	private productStream: Observable<any[]>;

	constructor(protected db: AngularFireDatabase) {
		this.productStream = this.db.list('products');
	}

  ngOnInit() {
  }

}
