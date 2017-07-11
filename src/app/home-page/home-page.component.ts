import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FILTER, SORT } from '../app.enum';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

	departmentStream: Observable<Department[]>;

	constructor(departmentService: DepartmentService) {
		this.departmentStream = departmentService.getList(SORT.NONE, FILTER.NONE, undefined);		
	}

	ngOnInit() {}

}
