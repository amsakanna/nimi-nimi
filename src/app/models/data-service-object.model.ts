import { Error } from './error.model';
import { STATUS, DATABASE_OPERATION } from '../app.enum';

export class DataServiceObject
{

    operation: DATABASE_OPERATION;
    status: STATUS;
    readonly object: any;
    readonly objectWithoutKey: any;
    error: Error;
    isValidKey: boolean;

    constructor({operation, object}) 
    {
        this.operation = operation;
        this.object = object;
        this.objectWithoutKey = Object.assign({}, object);
        if (this.objectWithoutKey != null && this.objectWithoutKey.$key != undefined)
            delete this.objectWithoutKey.$key;
    }

}
