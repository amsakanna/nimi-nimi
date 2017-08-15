import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishListService } from '../services/all-data.service';
import { WishList } from '../models/wish-list.model';

@Component({
	selector: 'app-wish-list',
	templateUrl: './wish-list.component.html',
	styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

	private item: WishList;

	constructor(private route: ActivatedRoute,
				private wishListService: WishListService)
	{
		var key = this.route.snapshot.params['key'];
		this.wishListService.getObject(key).subscribe(object => {
			this.item = object;
		});
	}

	ngOnInit() {
	}

}
