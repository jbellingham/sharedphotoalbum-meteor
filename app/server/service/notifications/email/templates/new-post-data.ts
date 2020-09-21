import { DynamicData } from "./dynamic-data"

export class NewPostData implements DynamicData {    
    firstName: string
    feedName: string
    postLink: string

    constructor(firstName: string, feedName: string, postLink: string) {
        this.firstName = firstName
        this.feedName = feedName
        this.postLink = postLink
    }
}