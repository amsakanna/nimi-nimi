import { User } from "./user.model";
import { CartItem } from "./cart-item.model";

export class Cart
{

    user: User;
    items: CartItem[];
    get total(): number
    {
        let total = 0;
        this.items.forEach( item => total += item.amount );
        return total;
    }
    get tax(): number
    {
        let five = 5;
        return Math.round(five.percentOf(this.total));
    }
    get grandTotal(): number
    {
        return this.total + this.tax;
    }

    constructor(object?: any)
    {
        object = object ? object : {};
        this.user = object.user ? object.user : new User();
        this.items = object.items ? object.items : new Array<CartItem>();
    }

}
