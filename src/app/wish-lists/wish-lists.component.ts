import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { WishListService } from '../services/all-data.service';
import { UserService } from '../services/user.service';
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
				private userService: UserService)
	{
		this.wishListStream = this.wishListService.getList(SORT.FOREIGN_KEY, FILTER.EQUAL_TO, this.userService.user.$key);
	}

	ngOnInit() {
	}

}
