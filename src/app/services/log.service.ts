import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

	constructor() { }

	dumpVariable(variableName: string, variableValue: any) {
		console.log(variableName, ":" + this.tabs(variableName), variableValue.toString());
	}

	tabs(text: string) : string {
		var tabs: string = "";
		const numberOfTabs = Math.floor( ( 28 - text.length ) / 4 );
		for( var i = 0; i < numberOfTabs; i++) {
			tabs = tabs.concat("\t");
		}
		return tabs;
	}

}
