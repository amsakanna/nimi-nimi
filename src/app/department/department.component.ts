import { Component, OnInit } from '@angular/core';
import { FILTER, SORT, STATUS } from '../app.enum';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../services/all-data.service';
import { AuthService } from '../services/auth.service';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-department-list',
	template: `
		<main class="container">	
			<jam-list class="stretch-with-max"
				[stream]="departmentStream"
				iconName="group_work"
				newItemUrl="new/edit"
				selectItemUrl="admin/dimension/department/:key">
				<template let-item="item" let-index="index" let-hoveredIndex="hoveredIndex" let-selectedIndex="selectedIndex">
					<div class="template-container">
						<div class="item-key"> {{ item.$key }} </div>
						<div class="item-name"> {{ item.name }} </div>
					</div>
				</template>
			</jam-list>
		</main>		
	`,
	styles: [`
		main {
			height: 100%;
		}
	`]
})
export class DepartmentListComponent implements OnInit {

	private departmentStream: Observable<Department[]>;

	ngOnInit() {}
	constructor(private departmentService: DepartmentService)
	{
		this.departmentStream = this.departmentService.getList(SORT.VALUE, FILTER.NONE);
	}

}

@Component({
	selector: 'app-department',
	template: `
		<jam-list-item title="Department" subtitle="view"
			[dataService]="departmentService"
			editItemUrl="edit"
			returnUrl="admin/dimension/department"
			[item]="item">
			<div jam-list-item-template>
				<div> {{ item?.$key }} </div>
				<div> {{ item?.name }} </div>
			</div>
		</jam-list-item>
	`
})
export class DepartmentComponent implements OnInit {

	private item: Department;

	ngOnInit() {}
	constructor(private departmentService: DepartmentService,
				private route: ActivatedRoute)
	{
		var key = this.route.snapshot.params['key'];
		this.departmentService.getObject(key).subscribe( object => this.item = object );
	}

}


@Component({
	selector: 'app-department-form',
	template: `
		<jam-form title="Department"
				subtitle="edit"
				[formElements]="formElements"
				[dataService]="departmentService"
				returnUrl="/admin/dimension/department">
		</jam-form>
	`
})
export class DepartmentFormComponent implements OnInit 
{

	private formElements: any[];
	private item: Department;

	ngOnInit() {}
	constructor(private departmentService: DepartmentService,
				private authService: AuthService,
				private route: ActivatedRoute) 
	{
		
		this.formElements = this.generateFormElements(this.item);

		var key = this.route.snapshot.params['key'];
		if(key != 'new') {
			this.departmentService.getObject(key).subscribe(object => {
				this.item = object;
				this.formElements = this.generateFormElements(this.item);
			});
		}

	}

	generateFormElements(item: Department) : any[]
	{
		if(item === undefined)
			item = new Department();
		var formElements = [
			{ key: '$key', exclude: true, initialValue: item.$key },
			{ key: 'name', exclude: false, initialValue: item.name, type: 'text', placeHolder: 'Name', formControlName: 'name' }
		];
		return formElements;
	}

}