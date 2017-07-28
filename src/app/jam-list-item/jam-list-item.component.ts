import { Component, OnInit, EventEmitter, Input, Output, ContentChild, TemplateRef } from '@angular/core';

@Component({
	selector: 'jam-list-item',
	templateUrl: './jam-list-item.component.html',
	styleUrls: ['./jam-list-item.component.css']
})
export class JamListItemComponent implements OnInit {

	@Input() title: string;
	@Input() subtitle: string;
	@Output() delete = new EventEmitter();
	@Output() edit = new EventEmitter();
	@Output() close = new EventEmitter();
	@Input() visible: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() {
	}

	_delete() {
		this.delete.emit();
	}

	_edit() {
		this.edit.emit();
	}

	_close() {
		this.visible = false;
		this.visibleChange.emit(this.visible);		
		this.close.emit();
	}

}
