import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'jam-list-item',
	templateUrl: './jam-list-item.component.html',
	styleUrls: ['./jam-list-item.component.css']
})
export class JamListItemComponent implements OnInit {

	@Input() title: string;
	@Input() subtitle: string;
	@Input() dataService: DataService<any>;
	@Input() editItemUrl: string;
	@Input() returnUrl: string;
	@Input() item: any;
	@Output() delete = new EventEmitter();
	@Output() edit = new EventEmitter();

	constructor(private router: Router) { }

	ngOnInit() {
	}

	_delete() 
	{
		if(this.dataService) 
		{
			this.dataService.delete(this.item);
			this.router.navigateByUrl(this.returnUrl);
		}
		this.delete.emit();
	}

	_edit() {
		this.edit.emit();
	}

	_goBack() {
		this.router.navigateByUrl(this.returnUrl);
	}

}
