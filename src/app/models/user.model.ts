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

    constructor({$key, firstName, lastName, email, photo, gender, rating, type})
    {
        this.$key = $key;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.photo = photo;
        this.gender = gender;
        this.rating = rating;
        this.type = type;
    }

}
