import { User } from "./user.model";
import { Address } from "./address.model";

export class Card
{

	$key: string;
	user: User;
	billingAddress: Address;
	holderName: string;
	number: string;
	expiryDate: Date;
    cvv: number;
    
    constructor( object?: any )
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.user = object.user ? object.user : object.userKey
            ? new User({ $key: object.userKey }) : new User();
        this.billingAddress = object.billingAddress ? object.billingAddress : object.billingAddressKey
            ? new Address( { $key: object.billingAddressKey }) : new Address();
        this.holderName = object.holderName ? object.holderName : '';
        this.number = object.number ? object.number : '';
        this.expiryDate = object.expiryDate ? object.expiryDate : new Date();
        this.cvv = object.cvv ? object.cvv : '';
    }

}
