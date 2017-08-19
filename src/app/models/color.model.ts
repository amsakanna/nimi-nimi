export class Color
{

    $key: string;
    code: string;
    name: string;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.code = object.code ? object.code : '';
        this.name = object.name ? object.name : '';
    }

}
