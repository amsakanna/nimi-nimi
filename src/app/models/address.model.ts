export class Address
{

    $key: string;
    userKey: string;    
    type: string;
    name: string;
    phone: string;
    pinCode: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object ? object.$key : '';
        this.userKey = object ? object.userKey : '';
        this.name = object ? object.name : '';
        this.phone = object ? object.phone : '';
        this.pinCode = object ? object.pinCode : '';
        this.type = object ? object.type : '';
        this.streetAddress = object ? object.streetAddress : '';
        this.city = object ? object.city : '';
        this.state = object ? object.state : 'Tamil Nadu';
        this.country = object ? object.country : 'India';
    }

}
