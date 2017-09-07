import { NavigationItem } from "./navigation-item.model";

export class Menu
{
    public navigationItem: NavigationItem;    
    public children: Array<Menu>;
    public skip: boolean;

    constructor( object?: any )
    {
        object = object ? object : {};

        this.navigationItem = object.navigationItem ? object.navigationItem : new NavigationItem();
        this.children = object.children ? object.children : null;
        this.skip = object.skip ? object.skip : false;
    }

    // public selectChild( menu: Menu )
    // {
    //     const childToBeSelected = this.children.find( child => child == menu );
    //     childToBeSelected.navigationItem.selected = true;
    // }

    // public get selectedChild() : Menu {
    //     return this.children.find( child => child.navigationItem.selected );
    // }

}