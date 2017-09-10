import { List } from "./list.model";
import { Tile } from "./tile.model";

export class SpanningGridCell
{
    public isEmpty: boolean;
    public isHead: boolean;
    public tile: Tile;
    public position: { x: number, y: number };

    constructor()
    {
        this.isEmpty = true;
        this.isHead = false;
        this.tile = null;
    }
}

export class SpanningGrid extends List<List<SpanningGridCell>>
{

    public thickness: number;
    public cellWidth: number;
    public tiles: List<Tile>;

    public get cols(): number
    {
        return this.length;
    }

    public get width(): number
    {
        return ( this.length * this.cellWidth );
    }

    public sortTiles()
    {
        var tiles = new List<Tile>();
        var cell: SpanningGridCell;

        for ( var j = 0; j < this.thickness; j++ )
        {
            for ( var i = 0; i < this.length; i++ )
            {
                cell = this[i][j];
                if( cell.isHead )
                    tiles.push( cell.tile );
            }
        }
        this.tiles = tiles;
    }

    constructor( thickness?: number, stripCount?: number, cellWidth?: number )
    {
        super();

        this.thickness = thickness ? thickness : 0;
        stripCount = stripCount ? stripCount : 1;
        this.extend( stripCount );
        this.cellWidth = cellWidth ? cellWidth : 100;

        this.tiles = new List<Tile>();

    }

    public extend( stripCount?: number )
    {
        for ( var i = 0; i < stripCount; i++ ) {
            this.push( this.createStrip() );            
        }
    }

    public createStrip() : List<SpanningGridCell>
    {
        var strip = new List<SpanningGridCell>();
        for ( var i = 0; i < this.thickness; i++ ) {
            strip.push( new SpanningGridCell() );            
        }
        return strip;
    }

    public addTile( tile: Tile )
    {
        var freeSpace: SpanningGridCell;

        while ( ! ( freeSpace = this.findSpace( tile ) ) ) {
            this.extend( 1 );
        }


        for ( var h = 0; h < tile.height; h++ )
        {
            for ( var w = 0; w < tile.width; w++ )
            {
                var cell = this[w + freeSpace.position.x][h + freeSpace.position.y];
                cell.isEmpty = false;
            }
        }

        freeSpace.tile = tile;
        freeSpace.isHead = true;

        this.sortTiles();

    }

    public findSpace( tile: Tile ) : SpanningGridCell
    {
        var remainingGridSpace: number;
        var remainingStripSpace: number;
        var strip: List<SpanningGridCell>;
        var space: SpanningGridCell;

        space = null;

        for ( var i = 0; i < this.length; i++ )
        {

            strip = this[i];

            remainingGridSpace = this.length - i;
            if( remainingGridSpace < tile.width ) break;

            for ( var j = 0; j < strip.length; j++ )
            {

                remainingStripSpace = strip.length - j;
                if( remainingStripSpace < tile.height ) break;
                        
                var spaceTaken = false;
                for ( var w = 0; w < tile.width; w++ )
                {
                    for ( var h = 0; h < tile.height; h++ )
                    {
                        var cell = this[w + i][h + j];
                        spaceTaken = ! cell.isEmpty;
                        if( spaceTaken ) break;
                    }
                    if( spaceTaken ) break;
                }

                if( ! spaceTaken )
                {
                    space = strip[j];
                    space.position = { x: i, y: j };
                    break;
                }
            }
            if( ! spaceTaken ) break;                
        }

        return space;
    }

    public stringify( cellSymbol?: string, cellSpacing?: number, sequence?: boolean )
    {
        var cellSpace: string;
        var text: string

        cellSymbol = cellSymbol ? cellSymbol : '[ ]';
        cellSpacing = cellSpacing ? cellSpacing : 2;
        sequence = sequence ? sequence : true;

        cellSpace = '';
        for ( var i = 0; i < cellSpacing; i++ ) {
            cellSpace += '\t';           
        }

        text = '';
        if( sequence ) {
            text += '   ' + cellSpace;
            for ( var c = 0; c < this.thickness; c++ ) {
                text += c + cellSpace;
            }
            text += '\n';
        }

        for ( var r = 0; r < this.length; r++ ) {

            if( sequence )
                text += r + cellSpace;

            for ( var c = 0; c < this[r].length; c++ ) {
                text += cellSymbol + cellSpace;
            }

            text += '\n';

        }

        return text;

    }

}