import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { DataService } from '../services/data.service';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable()
export class InventoryService extends DataService<InventoryItem> {

	protected foreignKeyName = null;
	protected searchKeyName = "units";
	protected tableName: string;

	constructor(db: AngularFireDatabase) {
		super(db, "inventory");
	}

	protected createModel(json): InventoryItem {
		return new InventoryItem(json);
	}

}
