export class List<T> extends Array<T>
{
    constructor()
    {
        super();
    }

    public contains( item ) 
    {
        return this.indexOf( item ) >= 0;
    };

}