import { EVENT } from '../app.enum';

export interface Event
{
    name: EVENT;

}

export class AuthEvent implements Event
{
    public name: EVENT;
    public returnUrl: string;

    constructor( object?: any )
    {
        object = object ? object : {};

        this.name = object.name ? object.name : EVENT.NONE;
        this.returnUrl = object.returnUrl ? object.returnUrl : '/';

    }

}