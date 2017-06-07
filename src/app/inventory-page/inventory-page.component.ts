import { Component, OnInit, Input, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FILTER, SORT, STATUS } from '../app.enum';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem } from '../models/inventory-item.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css'],
	animations: [
		trigger('listItemAnimation', [
			state('listItemState', style({				
				transform: 'translateY(0px)'			  
			})),			
			transition('void => *', animate('200ms ease-in', keyframes([
				style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
				style({opacity: 1, transform: 'translateY(0px)',     offset: 1.0})
			]))),		
			transition('* => void', animate('200ms ease-out', keyframes([
				style({opacity: 1, transform: 'translateY(0px)',     offset: 0}),
				style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
			]))),
		])
	]
})
export class InventoryPageComponent implements OnInit {

	private form: FormGroup;
	private inventoryStream: Observable<InventoryItem[]>;
	private selectedItem: InventoryItem;
	private selectedIndex: number;

	constructor(private formBuilder: FormBuilder,
				private inventoryService: InventoryService)
	{		
		this.buildForm();
		this.inventoryStream = this.inventoryService.getList(SORT.SEARCH_KEY, FILTER.NONE, undefined);
		this.selectedItem = new InventoryItem({$key: '', units: 0, price: 0});
		this.selectedIndex = 0;
	}

	ngOnInit() {
	}

	buildForm(item?: InventoryItem) : FormGroup
	{
		if(item)
		{
			this.form.setValue({
				key: item.$key,
				units: item.units,
				price: item.price
			})
		}
		else 
		{
			this.form = this.formBuilder.group({
				key: ['', Validators.required],
				units: [0, Validators.required],
				price: [0, Validators.required]
			});
		}
		return this.form;
	}

	buildModelFromForm() : InventoryItem
	{
		var itemJson = {
			$key: this.form.get('key').value,
			units: this.form.get('units').value,
			price: this.form.get('price').value
		};
		this.selectedItem = new InventoryItem(itemJson);
		return this.selectedItem;
	}

	submitForm()
	{
		const item = this.buildModelFromForm();
		console.log(item);
		this.inventoryService.update(item);
		this.selectedItem = item;
	}

	select(item: InventoryItem, i: number)
	{
		this.selectedIndex = i;
		this.selectedItem = item;
		this.buildForm(item);
	}

	delete() {
		if(this.selectedItem != undefined && this.selectedItem != null) {
			this.inventoryService.delete(this.selectedItem);
			this.selectedIndex -= 1;
		}
	}

	updatePreview(input: string) {

	}

}
