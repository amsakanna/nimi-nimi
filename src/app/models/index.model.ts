export class Index
{

    $key: string;
    matchList: any[];


    constructor(object?: any)    
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.matchList = new Array<any>();
        for (let key in object)
        {
            let value = object[key];
            if ( value )
                this.matchList.push(value);
        }
    }

}
