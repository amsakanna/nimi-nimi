import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { AuthService } from '../services/auth.service';
import { WishListService } from '../services/all-data.service';
import { WishList } from '../models/wish-list.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-wish-lists',
	templateUrl: './wish-lists.component.html',
	styleUrls: ['./wish-lists.component.css']
})
export class WishListsComponent implements OnInit 
{
	private wishListStream: Observable<WishList[]>;

	constructor(private wishListService: WishListService,
				private authService: AuthService)
	{
		this.wishListStream = this.wishListService.getList(SORT.FOREIGN_KEY, FILTER.EQUAL_TO, this.authService.user.$key);
	}

	ngOnInit() {
	}

}
