

export class Product {

    $key: string;
    name: string;
    price: number;
    thumbnail: string;    

    constructor({$key, name, price, thumbnail}) {
        this.$key = $key;
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    
}
