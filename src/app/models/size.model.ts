export class Size
{

    $key: string;
    unitOfMeasure: string;
    code: string;
    length: number;
    width: number;
    height: number;
    bustLength: number;
    waistLength: number;
    hipLength: number;
    shoulderLength: number;
    sleeveLength: number;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.unitOfMeasure = object.unitOfMeasure ? object.unitOfMeasure : '';
        this.code = object.code ? object.code : '';
        this.length = object.length ? object.length : 0;
        this.width = object.width ? object.width : 0;
        this.height = object.height ? object.height : 0;
        this.bustLength = object.bustLength ? object.bustLength : 0;
        this.waistLength = object.waistLength ? object.waistLength : 0;
        this.hipLength = object.hipLength ? object.hipLength : 0;
        this.shoulderLength = object.shoulderLength ? object.shoulderLength : 0;
        this.sleeveLength = object.sleeveLength ? object.sleeveLength : 0;
    }

}
