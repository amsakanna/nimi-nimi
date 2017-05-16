import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentService } from '../services/department.service';
import { FILTER, SORT } from '../models/constants';

@Component({
	selector: 'app-department-page',
	templateUrl: './department-page.component.html',
	styleUrls: ['./department-page.component.css']
})
export class DepartmentPageComponent implements OnInit {

	private departmentStream: Observable<any[]>;

	constructor(private departmentService: DepartmentService) {
		this.departmentStream = this.departmentService.getList(SORT.NONE, FILTER.NONE, undefined);
	}

	ngOnInit() {
	}

}
