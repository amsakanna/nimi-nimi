import { Component, OnInit, Input, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
				// style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
				style({opacity: 1, transform: 'translateY(0px)',     offset: 1.0})
			]))),		
			transition('* => void', animate('200ms ease-out', keyframes([
				style({opacity: 1, transform: 'translateY(0px)',     offset: 0}),
				// style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
				style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
			]))),
		])
	]
})
export class InventoryPageComponent implements OnInit {

	private inventoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
