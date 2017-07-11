export class Department
{

    $key: string;
    id: string;    
    name: string;
    path: string;

    constructor({$key, id, name, path})
    {
        this.$key = $key;
        this.id = id;
        this.name = name;
        this.path = path;
    }

}
