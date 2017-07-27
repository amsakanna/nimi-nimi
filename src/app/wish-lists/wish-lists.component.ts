import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-wish-lists',
	templateUrl: './wish-lists.component.html',
	styleUrls: ['./wish-lists.component.css']
})
export class WishListsComponent implements OnInit {

	private formVisible: boolean;

	constructor() { }

	ngOnInit() {
	}

	newItem()
	{
		this.formVisible = true;
	}
}
