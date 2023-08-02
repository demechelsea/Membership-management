import { MessageWrapModel } from '../messageWrapModel';

export default class EventTicketDTO extends MessageWrapModel {
    id:number;
    name: string;
    eventId: number;
    ticketType: string;
    numberOfTickets: number;
    peopleAllowedPerTicket: number;
    adminIssue: string;
    visibleToPublic: string;
}
