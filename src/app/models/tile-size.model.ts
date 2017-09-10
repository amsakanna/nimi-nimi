export class TileSize
{
    public $key: string;
    public width: number;
    public height: number;

    constructor( object?: any )
    {

        object = object ? object : {};

        this.$key = object.$key ? object.$key : '';
        this.width = object.width ? object.width : 1;
        this.height = object.height ? object.height : 1;
        
    }

}