import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { Department } from '../models/department.model';

@Injectable()
export class DepartmentService extends DataService<Department> {

	protected foreignKeyName = null;
	protected searchKeyName = "id";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "departments");
	}

	protected createModel(json): Department {
		return new Department(json);
	}

}
