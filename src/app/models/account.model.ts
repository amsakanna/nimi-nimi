export class Account
{

    $key: string;
    id: string;
    name: string;

    constructor( object?: any )
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.id = object.id ? object.id : '';
        this.name = object.name ? object.name : '';
    }

}
