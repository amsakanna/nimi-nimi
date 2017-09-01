export class Brand
{

    $key: string;
    id: string;
    name: string;
    rating: number;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.id = object.id ? object.id : '';
        this.name = object.name ? object.name : '';
        this.rating = object.rating ? object.rating : 0;
    }

}
