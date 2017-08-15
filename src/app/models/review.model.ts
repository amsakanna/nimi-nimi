export class Review
{

    $key: string;
    subject: string;
    subjectKey: string;
    userKey: string;
    text: string;
    rating: number;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.subject = object.subject ? object.subject : '';
        this.subjectKey = object.subjectKey ? object.subjectKey : '';
        this.userKey = object.userKey ? object.userKey : '';
        this.text = object.text ? object.text : '';
        this.rating = object.rating ? object.rating : 0;
    }

}
