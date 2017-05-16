import { Department } from './department.model';
import { Brand } from './brand.model';

export class Product {

    $key: string;
    id: string;
    name: string;
    units: number;
    price: number;
    color: string = '#1ec8c8';

    department: string;
    brand: string;

    thumbnailFile: File;
    thumbnailFileName: string;
    thumbnailPath: string;
    thumbnailUrl: string;
    productOverState: string = 'inactive';
    active: boolean = false;

    constructor({$key, id, name, units, price, department, brand, thumbnailFileName}) {
        this.$key = $key;
        this.id = id;
        this.name = name;
        this.units = units;
        this.price = price;
        this.department = department;
        this.brand = brand;        
        this.thumbnailFileName = thumbnailFileName;
    }

}
