import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-jam-list-container',
	templateUrl: './jam-list-container.component.html',
	styleUrls: ['./jam-list-container.component.css'],
	outputs: ['search']
})
export class JamListContainerComponent implements OnInit {

	public search = new EventEmitter();
	public newItem = new EventEmitter();

	constructor() { }
	ngOnInit() { }

	searchFn(text) {
		this.search.emit({
			value: text
		});
	}

	newItemFn() {
		this.newItem.emit();
	}

}
