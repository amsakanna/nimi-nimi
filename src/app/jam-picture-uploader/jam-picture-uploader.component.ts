import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'jam-picture-uploader',
	templateUrl: './jam-picture-uploader.component.html',
	styleUrls: ['./jam-picture-uploader.component.css']
})
export class JamPictureUploaderComponent implements OnInit
{

	private pictureSourceList: Array<string>;

	@Input() title: string;
	@Input() addButtonPictureUrl: string;
	@Input() pictureWidth: string;
	@Input() pictureHeight: string;

	ngOnInit() {}
	constructor()
	{		
		if( ! this.addButtonPictureUrl )
			this.addButtonPictureUrl = 'https://firebasestorage.googleapis.com/v0/b/nimi-nimi.appspot.com/o/assets%2Fadd_picture_button.png?alt=media&token=e54b7440-0ca6-4968-951c-a8bc08ad643c';
		if( ! this.pictureWidth )
			this.pictureWidth = '100px';
		if( ! this.pictureHeight )
			this.pictureHeight = '100px';
	}

	_showFileDialog() {
		document.getElementById('jam-picture-uploader-input').click();
	}

	_previewSelectedFiles( event: MSInputMethodContext )
	{

		var selectedFiles: FileList;
		var fileReader: FileReader;

		// Retrieve selected file details from file dialog
		selectedFiles = ( <HTMLInputElement> event.target ).files;

		// Exit if no files selected
		if( ! selectedFiles || selectedFiles.length < 1 )
			return;

		// Create a temporary array
		var pictureSourceList = new Array<string>();

		// Loop through selected files and load the temporary array
		for( var i = 0; i < selectedFiles.length; i++ )
		{
			fileReader = new FileReader();
			fileReader.onload = function ( event: FileReaderEvent ) {
				pictureSourceList.push( event.target.result );
			};
			fileReader.readAsDataURL( selectedFiles[i] );			
		}

		// Assign the temporary array to the global array
		this.pictureSourceList = pictureSourceList;

	}

	scrollme(direction: string)
	{
		document.getElementById('picture-list').scrollLeft += ( direction == 'left') ? -30 : 30;
	}

}
