import { Department } from './department.model';
import { Brand } from './brand.model';
import { Size } from './size.model';
import { Color } from './color.model';
import { Picture } from './picture.model';
import { Review } from './review.model';

export class Product
{

    $key: string;
    id: string;
    name: string;
    price: number;
    brand: Brand;
    department: Department;
    size: Size;
    color: Color;
    picture: Picture;
    review: Review;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.id = object.id ? object.id : '';
        this.name = object.name ? object.name : '';
        this.price = object.price ? Number(object.price) : 0;
        this.brand = object.brandKey ? new Brand( { $key: object.brandKey } ) : new Brand();
        this.department = object.departmentKey ? new Department( { $key: object.departmentKey } ) : new Department();
        this.size = object.sizeKey ? new Size( { $key: object.sizeKey } ) : new Size();
        this.color = object.colorKey ? new Color( { $key: object.colorKey } ) : new Color();
        this.picture = object.pictureKey ? new Picture( { $key: object.pictureKey } ) : new Picture();
        this.review = object.reviewKey ? new Review( { $key: object.reviewKey } ) : new Review();
    }

}
