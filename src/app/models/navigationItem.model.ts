export class NavigationItem
{
    public url: string;    
    public title: string;
    public subtitle: string;
    public description: string;
    public iconName: string;
    public redirectFromUrl: string;
    public selected: boolean;

    constructor( url: string, title: string, iconName?: string, redirectFromUrl?: string, subtitle?: string, description?: string, selected?: boolean ) {
        this.url = url;
        this.title = title;
        this.subtitle = (subtitle != undefined) ? subtitle : '';
        this.description = (description != undefined) ? description : '';
        this.iconName = (iconName != undefined) ? iconName : '';
        this.redirectFromUrl = (redirectFromUrl != undefined) ? redirectFromUrl: 'null';
        this.selected = (selected != undefined) ? selected : false;
    }
}