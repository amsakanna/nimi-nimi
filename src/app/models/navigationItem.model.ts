export class NavigationItem
{
    public link: string;
    public title: string;
    public subtitle: string;
    public description: string;
    public iconName: string;
    public selected: boolean;

    constructor( link: string, title: string, iconName?: string, subtitle?: string, description?: string, selected?: boolean ) {
        this.link = link;
        this.title = title;
        this.subtitle = (subtitle != undefined) ? subtitle : '';
        this.description = (description != undefined) ? description : '';
        this.iconName = (iconName != undefined) ? iconName : '';
        this.selected = (selected != undefined) ? selected : false;
    }
}