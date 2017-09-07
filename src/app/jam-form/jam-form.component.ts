import { Component, OnInit, EventEmitter, Input, Output, ContentChild, TemplateRef, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdSelectModule } from "@angular/material";
import { Observable } from 'rxjs';
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
	private overAddButton: boolean;

	@Input() formElements: any[];
	@Input() title: string;
	@Input() subtitle: string;
	@Input() dataService: DataService<any>;
	@Input() returnUrl: string;	
	@Input() preProcessUpdate: (itemUnderChange: any) => Observable<Observable<Observable<any>>>;

	@Output() save = new EventEmitter();
	@Output() reset = new EventEmitter();
	@Output() cancel = new EventEmitter();

	ngOnInit() {}
	ngOnChanges( changes: SimpleChanges )
	{
		this._refresh();
	}

	constructor(private formBuilder: FormBuilder,
				private router: Router) {}

	_refresh()
	{
		if( ! this.formElements ) return;
		var formObject = {};
		this.activeFormElements = this.formElements.filter( formElement => formElement.exclude == false );
		this.activeFormElements.forEach( formElement => 
		{
			formObject[formElement.key] = [ formElement.initialValue, formElement.validators ];
		});
		this.jamFormGroup = this.formBuilder.group( formObject );
	}

	_save()
	{

		var itemUnderChange = {};

		this.formElements.forEach( formElement => 
		{

			if( formElement.exclude )
			{
				itemUnderChange[formElement.key] = formElement.initialValue;
				return;
			}

			switch ( formElement.type )
			{
				case 'dropdown':
					itemUnderChange[formElement.key] = formElement.selectedValue;
					break;
				case 'photoUploader':
					itemUnderChange[formElement.key] = formElement.selectedFile;
					break;			
				default:
					itemUnderChange[formElement.key] = this.jamFormGroup.controls[formElement.formControlName].value;
					break;
			}


		});

		this.preProcessUpdate( itemUnderChange )
			.subscribe( uploadStatus => 
			uploadStatus.subscribe( url => 
				url.subscribe( preProcessedItem => {
					this.dataService
						.upsert( preProcessedItem, preProcessedItem['$key'] )
						.subscribe( () => {
							this.router.navigateByUrl( this.returnUrl );
						});			
		})));

		// this.save.emit();

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