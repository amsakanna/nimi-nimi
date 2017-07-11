import { Department } from './department.model';
import { Brand } from './brand.model';

export class Product
{

    $key: string;
    name: string;
    color: string = '#1ec8c8';

    department: string;
    brand: string;

    thumbnailFile: File;
    thumbnailFileName: string;
    thumbnailPath: string;
    thumbnailUrl: string;
    productOverState: string = 'inactive';
    active: boolean = false;

    constructor({$key, name, department, brand, thumbnailFileName})
    {
        this.$key = $key;
        this.name = name;
        this.department = department;
        this.brand = brand;        
        this.thumbnailFileName = thumbnailFileName;
    }

}
