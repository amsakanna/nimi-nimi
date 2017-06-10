import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'jam-list',
	templateUrl: './jam-list.component.html',
	styleUrls: ['./jam-list.component.css'],
	animations: [
		trigger('listItemAnimation', [
			state('listItemState', style({
				transform: 'translateY(0px)'			  
			})),			
			transition('void => *', animate('200ms ease-in', keyframes([
				style({transform: 'translateY(100%)'}),
				style({transform: 'translateY(0px)'})
			]))),		
			transition('* => void', animate('200ms ease-out', keyframes([
				style({transform: 'translateY(0px)'}),
				style({transform: 'translateY(-100%)'})
			])))
		])
	]
})
export class JamListComponent implements OnInit {

	@ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

	@Input() public stream: Observable<any[]>;
	@Input() public iconName: string;
	@Output() public search = new EventEmitter();
	@Output() public newItem = new EventEmitter();
	@Output() public delete = new EventEmitter();
	@Output() public select = new EventEmitter();

	constructor() { }

	ngOnInit() { }

	_search(text) 
	{
		this.search.emit( { value: text } );
	}

	_newItem() 
	{
		this.newItem.emit();
	}

	_delete(item: any)
	{
		this.delete.emit( { item: item } );
	}

	_select(item: any, index: number)
	{
		this.select.emit( { item: item, index: index });
	}

}
