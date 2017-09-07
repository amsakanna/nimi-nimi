import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationItem } from "../models/navigation-item.model";

@Component({
	selector: 'jam-double-menu',
	templateUrl: './jam-double-menu.component.html',
	styleUrls: ['./jam-double-menu.component.css']
})
export class JamDoubleMenuComponent implements OnInit {

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
