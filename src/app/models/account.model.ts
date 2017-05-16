export class Account {

    $key: string;
    name: string;
    parent: string;

    constructor({$key, name, parent}) {
        this.$key = $key;
        this.name = name;
        this.parent = parent;
    }

}
