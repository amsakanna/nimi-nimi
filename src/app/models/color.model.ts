export class Color
{

    $key: string;
    code: string;
    name: string;
    rgbCode: string;
    hexCode: string;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.code = object.code ? object.code : '';
        this.name = object.name ? object.name : '';
        this.rgbCode = object.rgbCode ? object.rgbCode : '';
        this.hexCode = object.hexCode ? object.hexCode : '';
    }

}
