export class Tag
{

    $key: string;
    name: string;
    type: string;

    constructor(object?: {$key, name, type})
    {
        this.$key = object ? object.$key : '';
        this.name = object ? object.name : '';
        this.type = object ? object.type : '';
    }

}
