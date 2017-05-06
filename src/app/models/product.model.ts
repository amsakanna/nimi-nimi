

export class Product {

    $key: string;
    id: string;
    name: string;
    price: number;
    thumbnailFile: File;
    thumbnailFileName: string;
    thumbnailPath: string;
    thumbnailUrl: string;
    productOverState: string = 'inactive';
    active: boolean = false;

    constructor({$key, id, name, price, thumbnailFileName}) {
        this.$key = $key;
        this.id = id;
        this.name = name;
        this.price = price;
        this.thumbnailFileName = thumbnailFileName;
    }

	toggleProductOverState(state: string='auto') {
        switch (state) {
            case 'inactive':
                this.productOverState = 'inactive';
                break;        
            case 'active':
                this.productOverState = 'active';
                break;
            default:
                this.productOverState = (this.productOverState === 'inactive' ? 'active' : 'inactive');
                break;
        }		
	}

}
