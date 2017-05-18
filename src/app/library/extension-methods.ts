export{}

declare global {
	interface Array<T> {
		doesExist(item: T): boolean;
	}
	interface String {
		doesExist(searchString): boolean;
	}
}

Array.prototype.doesExist = function (item) {
	return this.indexOf(item) >= 0;
};

String.prototype.doesExist = function (searchString) {
	return this.indexOf(searchString) >= 0;
}

