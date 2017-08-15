import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { WishListService } from '../services/all-data.service';
import { AuthGuard } from '../services/auth.service';
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
				returnUrl="/user/wish-lists">
		</jam-form>
	`
})
export class WishListFormComponent implements OnInit 
{

	private formElements: any[];
	private currentUser: User;
	private item: WishList;

	ngOnInit() {}

	constructor(private wishListService: WishListService,
				private authGuard: AuthGuard,
				private route: ActivatedRoute) 
	{
		
		this.formElements = this.generateFormElements(this.item);

		var key = this.route.snapshot.params['key'];
		this.authGuard.getUser().subscribe(user => 
		{
			this.currentUser = user;
			if(key == 'new') {
				this.formElements = this.generateFormElements(this.item);
			} else {
				this.wishListService.getObject(key).subscribe(object => {
					this.item = object;
					this.formElements = this.generateFormElements(this.item);
				});
			}
		});

	}

	generateFormElements(item: WishList) : any[]
	{
		if(item === undefined)
			item = new WishList();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'userKey', exclude: true, initialValue: this.currentUser ? this.currentUser.$key : '' },
			{ key: 'name', exclude: false, initialValue: item.name, type: 'text', placeHolder: 'Name', formControlName: 'name' },
		];
		return formElements;
	}

}
