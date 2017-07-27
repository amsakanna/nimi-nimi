import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Query } from 'angularfire2/interfaces';
import { Observable } from 'rxjs';
import { RouterService } from './services/router.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	private productStream: Observable<any[]>;

	constructor(protected db: AngularFireDatabase,
				protected routerService: RouterService) {
		this.productStream = this.db.list('products');
	}

}
