import { User } from "./user.model";

export class WishList
{

    $key: string;
    user: User;
    name: string;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.user = object.user ? object.user : object.userKey
            ? new User({ $key: object.userKey }) : new User();
        this.name = object.name ? object.name : '';
    }

}
