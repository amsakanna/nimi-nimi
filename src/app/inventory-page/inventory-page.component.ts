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
				style({transform: 'translateY(100%)'}),
				style({transform: 'translateY(0px)'})
			]))),		
			transition('* => void', animate('200ms ease-out', keyframes([
				style({transform: 'translateY(0px)'}),
				style({transform: 'translateY(-100%)'})
			])))
		])
	]
})
export class InventoryPageComponent implements OnInit {

	private form: FormGroup;
	private inventoryStream: Observable<InventoryItem[]>;
	private selectedItem: InventoryItem;
	private selectedIndex: number;
	private formVisible: boolean;

	ngOnInit() {}

	constructor(private formBuilder: FormBuilder,
				private inventoryService: InventoryService)
	{
		this.buildForm();
		this.inventoryStream = this.inventoryService.getList(SORT.KEY, FILTER.NONE, undefined).map(list => {
			var i = 0;
			return list.map(item => {
				this.selectedIndex = ( item.$key == this.selectedItem.$key ) ? i : this.selectedIndex;
				i = i + 1;
				return item;
			});			
		});
		this.selectedItem = new InventoryItem({$key: '', units: 0, price: 0});
		this.selectedIndex = 0;
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
		this.inventoryService.update(item);
		this.selectedItem = item;
	}

	select(item: InventoryItem, index: number)
	{
		this.formVisible = false;
		this.selectedIndex = index;
		this.selectedItem = item;
		this.buildForm(item);
		setTimeout(() => {
			this.formVisible = true;
		}, 100);
	}

	deselect(event)
	{
		this.formVisible = (event.target.id != 'container');
	}

	delete(item: InventoryItem)
	{
		if(item == this.selectedItem)
			this.selectedIndex -= 1;
		this.inventoryService.delete(item);		
	}

	newItem()
	{
		this.buildForm();
		this.formVisible = true;
	}

	toggleMode()
	{
		
	}

}
