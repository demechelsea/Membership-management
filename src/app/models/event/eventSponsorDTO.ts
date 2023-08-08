import { MessageWrapModel } from "../messageWrapModel";

export default class EventSponsorDTO extends MessageWrapModel {
    id:number;
    eventId: number;
    assocId: number;
    name: string;
    sponsorshipType: string;
    description: string;
    paymentMethod: string;
    paymentDate: string;
    companyId: string;
    status: string;
}
