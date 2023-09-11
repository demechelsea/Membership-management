import { MessageWrapModel } from "../messageWrapModel";

export default class EventTicketIssuedDTO extends MessageWrapModel {
    id:number;
    encryptedId:string;
    eventId: number;
    encryptedEventId: string;
    ticketId: number;
    couponId: number;
    name: string;
    emailId: string;
    phoneNumber: string;
    ticketPurchased: number;
    totalAmount: number;
    status: string;
    issueNumber: string;
    smsTicket: string;
    emailTicket: string;

}
