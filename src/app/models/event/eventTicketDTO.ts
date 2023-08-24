import { MessageWrapModel } from '../messageWrapModel';

export default class EventTicketDTO extends MessageWrapModel {
    id:number;
    encryptedId:string;
    name: string;
    description: string;
    eventId: number;
    encryptedEventId: string;
    ticketType: string;
    ticketTypes: string[]
    numberOfTickets: number;
    ticketPrice: number;
    peopleAllowedPerTicket: number;
    adminIssue: string;
    visibleToPublic: string;
}
