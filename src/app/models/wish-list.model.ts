interface IWishList
{
    $key: string; userKey: string; name: string;
}

export class WishList
{

    $key: string;
    userKey: string;
    name: string;

    constructor();
    constructor(object: IWishList);
    constructor(object?: any)
    {
        this.$key = object ? object.$key : '';
        this.userKey = object ? object.userKey : '';
        this.name = object ? object.name : '';
    }

}
