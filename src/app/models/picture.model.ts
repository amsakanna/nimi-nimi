export class Picture
{
    $key: string;
    name: string;
    thumbnail: string;
    frontView: string;
    backView: string;
    leftView: string;
    rightView: string;
    topView: string;
    bottomView: string;
    closeView1: string;
    closeView2: string;
    otherView1: string;
    otherView2: string;
    otherView3: string;
    otherView4: string;
    bigView: string;
    largeView: string;
    maxResolution: string;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.name = object.name ? object.name : '';
        this.thumbnail = object.thumbnail ? object.thumbnail : '';
        this.frontView = object.frontView ? object.frontView : '';
        this.backView = object.backView ? object.backView : '';
        this.leftView = object.leftView ? object.leftView : '';
        this.rightView = object.rightView ? object.rightView : '';
        this.topView = object.topView ? object.topView : '';
        this.bottomView = object.bottomView ? object.bottomView : '';
        this.closeView1 = object.closeView1 ? object.closeView1 : '';
        this.closeView2 = object.closeView2 ? object.closeView2 : '';
        this.otherView1 = object.otherView1 ? object.otherView1 : '';
        this.otherView2 = object.otherView2 ? object.otherView2 : '';
        this.otherView3 = object.otherView3 ? object.otherView3 : '';
        this.otherView4 = object.otherView4 ? object.otherView4 : '';
        this.bigView = object.bigView ? object.bigView : '';
        this.largeView = object.largeView ? object.largeView : '';
        this.maxResolution = object.maxResolution ? object.maxResolution : '';
    }

}
