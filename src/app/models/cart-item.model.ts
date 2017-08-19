import { Product } from "./product.model";

export class CartItem
{

    $key: string;
    product: Product;
    units: number;
    get amount(): number
    {
        return this.product.price * this.units;
    }

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.product = object.productKey ? new Product( { $key: object.productKey } ) : new Product();
        this.units = object.units ? object.units : 0;
    }

}
