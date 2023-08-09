import { MessageWrapModel } from "../messageWrapModel";

export default class EventGalleryDTO extends MessageWrapModel {
    id:number;
    eventId: number;
    type: string;
    imageVideoLink: string;
    showToPublic: boolean;
    showToMember: boolean;
    useInWebsite: boolean;
}
