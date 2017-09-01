import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
	selector: 'jam-photo-uploader',
	templateUrl: './jam-photo-uploader.component.html',
	styleUrls: ['./jam-photo-uploader.component.css']
})
export class JamPhotoUploaderComponent implements OnInit
{

	private _photoSource: string;
	private _addButtonPhotoSource: string;

	@Input() photoSource: string;
	@Input() addButtonPhotoSource: string;
	@Input() selectedFile: File;
	
	@Output() selectedFileChange = new EventEmitter<File>();

	ngOnInit() {}
	ngOnChanges( changes: SimpleChanges )
	{
		this.refresh();
	}
	constructor()
	{
		this._addButtonPhotoSource = 'https://firebasestorage.googleapis.com/v0/b/nimi-nimi.appspot.com/o/assets%2Fadd_picture_button.png?alt=media&token=e54b7440-0ca6-4968-951c-a8bc08ad643c';
	}
	
	refresh()
	{
		this._photoSource = this.photoSource
							? this.photoSource
							: this.addButtonPhotoSource
								? this.addButtonPhotoSource
								: this._addButtonPhotoSource;		
	}

	_showFileDialog()
	{
		document.getElementById('jam-photo-uploader-input').click();
	}

	_processFile( event: MSInputMethodContext )
	{

		var selectedFile: File;
		var fileReader: FileReader;

		// Retrieve selected file details from file dialog
		selectedFile = ( <HTMLInputElement> event.target ).files[0];

		// Exit if no files selected
		if( ! selectedFile )
			return;

		// Read file
		fileReader = new FileReader();
		var outerClass = this;
		fileReader.onload = function ( event: FileReaderEvent ) {
			outerClass._photoSource = event.target.result;
		};
		fileReader.readAsDataURL( selectedFile );

		this.selectedFileChange.emit( selectedFile );

	}

}
