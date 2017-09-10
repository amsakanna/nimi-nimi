import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";

@Component({
	selector: 'jam-grid',
	templateUrl: './jam-grid.component.html',
	styleUrls: ['./jam-grid.component.css']
})
export class JamGridComponent implements OnInit {

	@Input() dataSource: Observable<any>
	
	ngOnInit() {}

	constructor()
	{

	}


}
