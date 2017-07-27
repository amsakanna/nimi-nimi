export class Card
{

	$key: string;
	userKey: string;
	billingAddressKey: string;
	holderName: string;
	number: string;
	expiryDate: Date;
	cvv: number;

    constructor( { $key, userKey, billingAddressKey, holderName, number, expiryDate, cvv } )
    {
        this.$key = $key;
        this.userKey = userKey;
        this.billingAddressKey = billingAddressKey;
        this.holderName = holderName;
        this.number = number;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
    }

}
