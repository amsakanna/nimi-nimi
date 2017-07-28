import { Component, OnInit, EventEmitter, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
export class JamListComponent implements OnInit 
{

	private _selectedItem: any;
	private _selectedIndex: number;
	private _hoveredIndex: number;
	private deleteButtonState: string;

	@ContentChild(TemplateRef) listItemTemplate: TemplateRef<any>;
	@Input() stream: Observable<any[]>;
	@Input() iconName: string;
	@Input() hideDeleteButton: boolean;
	@Input() hideNewButton: boolean;
	@Input() formTitle: string;
	@Input() formSubtitle: string;
	@Output() search = new EventEmitter();
	@Output() newItem = new EventEmitter();
	@Output() delete = new EventEmitter();
	@Input() selectedItem: any;
	@Output() selectedItemChange = new EventEmitter<any>();
	@Output() select = new EventEmitter();

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

	_select(item: any, index: number)
	{
		this._selectedItem = item;
		this._selectedIndex = index;
		this.select.emit( { item: item, index: index });
		this.selectedItemChange.emit(this._selectedItem);
	}

	_deselect()
	{
		this._selectedItem = null;
		this._selectedIndex = null;
		this.selectedItemChange.emit(this._selectedItem);
	}

}
