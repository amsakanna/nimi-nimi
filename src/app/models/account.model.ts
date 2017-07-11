export class Account
{

    $key: string;
    name: string;

    constructor({$key, name})
    {
        this.$key = $key;
        this.name = name;
    }

}
