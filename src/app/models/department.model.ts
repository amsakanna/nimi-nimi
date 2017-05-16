export class Department {

    $key: string;
    id: string;    
    name: string;
    path: string;
    parent: Department;

    constructor({$key, id, name, path, parent}) {
        this.$key = $key;
        this.id = id;
        this.name = name;
        this.path = path;
        this.parent = parent;
    }

}
