export class Tile
{

    public data: any;
    public width: number;
    public height: number;
    public color: { r: number, g: number, b: number };
    public padding: number;
    
    constructor( object?: any )
    {
        object = object ? object : {};

        this.data = object.data ? object.data : null;
        this.width = object.width ? object.width : 1;
        this.height = object.height ? object.height : 1;
        this.color = object.color ? object.color : { r: 255, g: 255, b: 255 };
        this.padding = object.padding ? object.padding : 0;
    }

}