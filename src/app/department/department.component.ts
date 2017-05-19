import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FILTER, SORT } from '../models/constants';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import "rxjs/add/operator/first";

@Component({
	selector: 'app-department',
	templateUrl: './department.component.html',
	styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

	department: Department;
  	departmentForm: FormGroup;
	routeId: string;
	departmentStream: Observable<Department[]>

	constructor(private route: ActivatedRoute, 
				private router: Router,
				private formBuilder: FormBuilder,
				private departmentService: DepartmentService) 
	{
		this.newForm();
		this.departmentStream = departmentService.getList(SORT.NONE, FILTER.NONE, undefined);
	}

	ngOnInit() {		
		this.route.params.subscribe((params: Params) =>  {
			this.routeId = params['id'];
			if(this.routeId == "null") this.newForm();
			this.departmentService.getList(SORT.SEARCH_KEY, FILTER.EQUAL_TO, this.routeId)
			.first().subscribe(departments => departments.forEach(department => {				
				this.department = department
				this.departmentForm.setValue({
					id: department.id,
					name: department.name,
					path: department.path,
					parent: department.parent
				});
			}));
		});
	}

	newForm() {
		this.departmentForm = this.formBuilder.group({
			id: ['', Validators.required],
			name: ['', Validators.required],
			path: ['', Validators.required],
			parent: ['']
		});
		this.department = new Department({$key: '', id: '', name: '', path: '', parent: {}});
	}

	submitForm() {
		var department: Department = new Department ({
			$key: this.department.$key,
			id: this.departmentForm.get('id').value,
			name: this.departmentForm.get('name').value,
			path: this.departmentForm.get('path').value,
			parent: this.departmentForm.get('parent').value
		});
		this.departmentService.upsert(department);
	}

	removeDepartment() {
		this.departmentService.delete(this.department);
	}

}
