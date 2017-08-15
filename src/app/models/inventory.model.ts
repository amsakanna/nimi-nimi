export interface IInventory
{
    $key: string; units: number; price: number;
}

export class Inventory
{

    $key: string;
    units: number;
    price: number;

    constructor();
    constructor(object: IInventory);
    constructor(object?: any)
    {
        this.$key = object ? object.$key : '';
        this.units = object ? object.units : 0;
        this.price = object ? object.price : 0;
    }

}
