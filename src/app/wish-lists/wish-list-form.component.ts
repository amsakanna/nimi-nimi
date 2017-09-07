import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { WishListService } from '../services/all-data.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { WishList } from '../models/wish-list.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-wish-list-form',
	template: `
		<jam-form title="WishList"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="wishListService"
				[returnUrl]="returnUrl">
		</jam-form>
	`
})
export class WishListFormComponent implements OnInit 
{

	private returnUrl: string;
	private formElements: any[];
	private wishList: WishList;

	ngOnInit() {}

	constructor(private route: ActivatedRoute,
				private userService: UserService,
				private wishListService: WishListService)
	{
		
		this.returnUrl = '/user/wish-lists';
		this.wishList = new WishList({
			$key: this.route.snapshot.params['key'],
			user: this.userService.user
		});
		
		this.generateFormElements();

		if( this.wishList.$key != 'new' )
		{
			this.wishListService
			.getObject( this.wishList.$key )
			.subscribe( wishList => {
				this.wishList = wishList;
				this.generateFormElements();
			});
		}

	}

	generateFormElements()
	{
		this.formElements = [
			{ key: '$key', exclude: true, initialValue: this.wishList.$key },
			{ key: 'userKey', exclude: true, initialValue: this.wishList.user.$key },
			{ key: 'name', exclude: false, initialValue: this.wishList.name, type: 'text', placeHolder: 'Name', formControlName: 'name' },
		];
	}

}
