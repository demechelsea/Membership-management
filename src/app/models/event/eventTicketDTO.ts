import { MessageWrapModel } from '../messageWrapModel';

export default class EventTicketDTO extends MessageWrapModel {
    id:number;
    name: string;
    description: string;
    eventId: number;
    ticketType: string;
    ticketTypes: string[]
    numberOfTickets: number;
    ticketPrice: number;
    peopleAllowedPerTicket: number;
    adminIssue: string;
    visibleToPublic: string;
}
