import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-product-search-bar',
	templateUrl: './product-search-bar.component.html',
	styleUrls: ['./product-search-bar.component.css']
})
export class ProductSearchBarComponent implements OnInit {

	private formGroup: FormGroup;
	@Output() search = new EventEmitter<string>();

	ngOnInit() { }
	constructor(private formBuilder: FormBuilder)
	{
		this.formGroup = this.formBuilder.group({ search: [ '' ] });
	}

	_search()
	{
		var text = this.formGroup.controls['search'].value;
		this.search.emit(text);
	}

}
