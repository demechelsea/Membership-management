import { MessageWrapModel } from "../messageWrapModel";

export default class EventGalleryDTO extends MessageWrapModel {
    id:number;
    encryptedId:string;
    eventId: number;
    encryptedEventId: string;
    type: string;
    name: string;
    imageVideoLink: string;
    showToPublic: boolean;
    showToMember: boolean;
    useInWebsite: boolean;
}
