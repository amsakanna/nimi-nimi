export class Brand
{

    $key: string;
    name: string;
    rating: number;

    constructor({$key, name, rating})
    {
        this.$key = $key;
        this.name = name;
        this.rating = rating;
    }

}
