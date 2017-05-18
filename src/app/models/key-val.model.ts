export class KeyVal {

    $key: string;    
    $value: string;
    category: string;

    constructor({$key, $value}, category: string) {
        this.$key = $key;
        this.$value = $value;
        this.category = category;
    }

}
