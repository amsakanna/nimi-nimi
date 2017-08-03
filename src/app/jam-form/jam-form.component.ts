import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'jam-form',
	templateUrl: './jam-form.component.html',
	styleUrls: ['./jam-form.component.css']
})
export class JamFormComponent implements OnInit
{

	private jamFormGroup: FormGroup;
	private activeFormElements: any[];

	@Input() formElements: any[];
	@Input() title: string;
	@Input() subtitle: string;
	@Input() dataService: DataService<any>;
	@Input() returnUrl: string;

	@Output() save = new EventEmitter();
	@Output() reset = new EventEmitter();
	@Output() cancel = new EventEmitter();

	constructor(private formBuilder: FormBuilder,
				private router: Router) {}

	ngOnInit()
	{
		this.build();
	}

	build()
	{
		var formObject = {};
		this.activeFormElements = this.formElements.filter(formElement => formElement.exclude == false);
		this.activeFormElements.forEach(formElement => 
		{
			formObject[formElement.key] = [ formElement.initialValue, formElement.validators ]
		});
		this.jamFormGroup = this.formBuilder.group(formObject);
	}

	_save()
	{
		var itemUnderChange = {};
		var itemUnderChangeKey = '';
		this.formElements.forEach(formElement => 
		{
			itemUnderChange[formElement.key] = formElement.exclude 
				? formElement.initialValue 
				: this.jamFormGroup.controls[formElement.formControlName].value;
			if(formElement.key == '$key')
				itemUnderChangeKey = formElement.initialValue;
		});
		this.dataService.upsert(itemUnderChange, itemUnderChangeKey);
		// this.save.emit();
		this.router.navigateByUrl(this.returnUrl);
	}

	_reset()
	{
		var patchObject = {};
		this.activeFormElements.forEach(formElement => 
		{
			patchObject[formElement.key] = formElement.initialValue;
		});
		this.jamFormGroup.patchValue(patchObject);
		this.reset.emit();
	}

	_cancel()
	{
		this.cancel.emit();
		this.router.navigateByUrl(this.returnUrl);
	}

}
