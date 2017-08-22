import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from './data.service';

@Injectable()
export class DefaultService extends DataService<any>
{
	constructor(db: AngularFireDatabase)
	{
		super(db);
	}

	protected createModel(json) : any
	{
		return json;
	}

	subject(tableName: string) : DefaultService
	{
		this.setTable( 'Default/' + tableName );
		return this;
	}

}