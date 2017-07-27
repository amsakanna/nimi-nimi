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

    constructor({$key, userKey, type, name, phone, pinCode, streetAddress, city, state, country})
    {
        this.$key = $key;
        this.userKey = userKey;
        this.name = name;
        this.phone = phone;
        this.pinCode = pinCode;
        this.type = type;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.country = country;
    }

}
