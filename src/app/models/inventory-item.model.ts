import { Product } from './product.model';

export class InventoryItem {

    $key: string;
    units: string;
    price: number;

    constructor({$key, units, price}) {
        this.$key = $key;
        this.units = units;
        this.price = price;
    }

}
