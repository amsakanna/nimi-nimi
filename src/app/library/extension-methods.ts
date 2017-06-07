export{}

declare global {
	interface Array<T> {
		doesExist(item: T): boolean;
	}
	interface String {
		doesExist(searchString: string, ignoreCase?: boolean): boolean;
	}
}

Array.prototype.doesExist = function (item) {
	return this.indexOf(item) >= 0;
};

String.prototype.doesExist = function (searchString, ignoreCase?) {	
	if(ignoreCase) {
		return this.toLowerCase().indexOf(searchString.toLowerCase()) >= 0;
	}
	else
		return this.indexOf(searchString) >= 0;
}
