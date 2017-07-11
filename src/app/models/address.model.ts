export class Address
{

    $key: string;
    userKey: string;
    type: string;
    doorNumber: string;
    street: string;
    area: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    phone: string;
    email: string;
    active: string;

    constructor({$key, userKey, type, doorNumber, street, area, city, district, state, country, pincode, phone, email, active})
    {
        this.$key = $key;
        this.userKey = userKey;
        this.type = type;
        this.doorNumber = doorNumber;
        this.street = street;
        this.area = area;
        this.city = city;
        this.district = district;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
        this.phone = phone;
        this.email = email;
        this.active = active;
    }

}
