import { User } from "./user.model";

export class Address
{

    $key: string;
    user: User;    
    type: string;
    name: string;
    phone: string;
    pinCode: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;

    constructor( object?: any )
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.user = object.user ? object.user : object.userKey
            ? new User( { $key: object.userKey } ) : new User();
        this.name = object.name ? object.name : '';
        this.phone = object.phone ? object.phone : '';
        this.pinCode = object.pinCode ? object.pinCode : '';
        this.type = object.type ? object.type : '';
        this.streetAddress = object.streetAddress ? object.streetAddress : '';
        this.city = object.city ? object.city : '';
        this.state = object.state ? object.state : 'Tamil Nadu';
        this.country = object.country ? object.country : 'India';
    }

}
