import { Component, OnInit, EventEmitter, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
	selector: 'jam-form',
	templateUrl: './jam-form.component.html',
	styleUrls: ['./jam-form.component.css']
})
export class JamFormComponent implements OnInit 
{

	@ContentChild(TemplateRef) formTemplate: TemplateRef<any>;
	
	@Input() form: FormGroup;
	@Input() title: string;
	@Input() subtitle: string;
	@Output() save = new EventEmitter();
	@Output() close = new EventEmitter();
	@Output() reset = new EventEmitter();
	@Input() visible: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();

	ngOnInit() {}	
	constructor(private formBuilder: FormBuilder)
	{
	}

	_save()
	{
		this.save.emit();
	}

	_reset()
	{
		this.form.reset();
		this.reset.emit();
	}

	_close()
	{
		this.visible = false;
		this.visibleChange.emit(this.visible);
		this.close.emit();
	}

}
