export class NavigationItem
{
    public $key: string;
    public sortKey: number;
    public link: string;    
    public text: string;
    public toggleText: string;
    public icon: string;
    public container: boolean;
    public parent: NavigationItem;
    public children: Array<NavigationItem>;
    public redirectFromLink: string;
    public selected: boolean;

    constructor( object?: any )
    {

        object = object ? object : {};

        this.$key = object.$key ? object.$key : '';
        this.sortKey = object.sortKey ? object.sortKey : 1;
        this.link = object.link ? object.link : '';
        this.text = object.text ? object.text : '';
        this.toggleText = object.toggleText ? object.toggleText : '';
        this.icon = object.icon ? object.icon : '';
        this.container = object.container ? object.container : false;
        this.parent = object.parent ? new NavigationItem( { $key: object.parent } ) : object.$key 
            ? new NavigationItem() : null;
        this.children = object.children ? object.children : null;
        this.redirectFromLink = object.redirectFromLink ? object.redirectFromLink : 'null';
        this.selected = object.selected ? object.selected : false;
        
    }

    public static match( url: string, refList: Array<NavigationItem> ) : NavigationItem
    {
        return refList.find( navigationItem => 
            ! ( navigationItem.container) && ( navigationItem.link == url )
        );
    }

    public setChildren( refList: Array<NavigationItem> ) : Array<NavigationItem>
    {
        this.children = refList
            .filter( navigationItem => navigationItem.parent.$key == this.$key )
            .sort( ( a, b ) => a.sortKey - b.sortKey );
        return this.children;
    }

    public setParent( refList: Array<NavigationItem> ) : NavigationItem
    {
        this.parent = refList.find( navigationItem => navigationItem.$key == this.parent.$key );
        return this.parent;
    }

}