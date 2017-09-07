import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationItem } from "../models/navigation-item.model";

@Component({
	selector: 'jam-menu',
	templateUrl: './jam-menu.component.html',
	styleUrls: ['./jam-menu.component.css']
})
export class JamMenuComponent implements OnInit {

	@Input() menu: Array<NavigationItem>;
	@Input() parentMenu: Array<NavigationItem>;

	@Output() select: EventEmitter<NavigationItem>;

	ngOnInit() {}
	constructor()
	{
		this.select = new EventEmitter<NavigationItem>();
	}

	_select( navigationItem: NavigationItem )
	{
		this.select.emit( navigationItem );
	}

}
