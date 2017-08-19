export class User
{

	$key: string;
	firstName: string;
	lastName: string;
	email: string;
	photo: string;
	gender: string;
	rating: number;
	type: number;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.firstName = object.firstName ? object.firstName : '';
        this.lastName = object.lastName ? object.lastName : '';
        this.email = object.email ? object.email : '';
        this.photo = object.photo ? object.photo : '';
        this.gender = object.gender ? object.gender : '';
        this.rating = object.rating ? object.rating : 0;
        this.type = object.type ? object.type : 0;
    }

}
