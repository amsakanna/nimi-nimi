export class Card
{

	$key: string;
	userKey: string;
	billingAddressKey: string;
	holderName: string;
	number: string;
	expiryDate: Date;
    cvv: number;
    
    constructor(object?: { $key, userKey, billingAddressKey, holderName, number, expiryDate, cvv })
    {
        this.$key = object ? object.$key : '';
        this.userKey = object ? object.userKey : '';
        this.billingAddressKey = object ? object.billingAddressKey : '';
        this.holderName = object ? object.holderName : '';
        this.number = object ? object.number : '';
        this.expiryDate = object ? object.expiryDate : '';
        this.cvv = object ? object.cvv : '';
    }

}
