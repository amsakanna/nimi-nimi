export class Department
{

    $key: string;
    id: string;    
    name: string;
    path: string;

    constructor(object?: {$key, id, name, path})
    {
        this.$key = object ? object.$key : '';
        this.id = object ? object.id : '';
        this.name = object ? object.name : '';
        this.path = object ? object.path : '';
    }

}
