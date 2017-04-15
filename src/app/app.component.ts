import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Query } from 'angularfire2/interfaces';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	private productStream: Observable<any[]>;

	constructor(protected db: AngularFireDatabase) {
		this.productStream = this.db.list('products');
	}

}