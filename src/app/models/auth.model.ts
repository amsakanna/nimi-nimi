import { EVENT } from "../app.enum";
import { User } from "./user.model";

export class Auth
{

	$key: string;
	loggedIn: boolean;
	user: User;
	logInTime: Date;
    logOutTime: Date;
    event: EVENT;

    constructor( object?: any )
    {
        object = object ? object : {};

        this.$key = object.$key ? object.$key : '';

        if( object.event && object.event == EVENT.LOG_IN ) {
            this.loggedIn = true;
            this.logInTime = new Date();                
            this.logOutTime = null;
            this.user = object.user ? object.user : new User();
        } else if( object.event && object.event == EVENT.LOG_OUT ) {
            this.loggedIn = false;
            this.logOutTime = new Date(); 
            this.user = null;
        } else {
            this.loggedIn = object.loggedIn ? object.loggedIn : false;
            this.user = object.user ? object.user : new User();
            this.logInTime = object.logInTime ? object.logInTime : null;
            this.logOutTime = object.logOutTime ? object.logOutTime : null;
        }
    }

}
