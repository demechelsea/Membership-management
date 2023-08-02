import { MessageWrapModel } from "../messageWrapModel";
import { PageModel } from "../page-model";
import {AssociationModel} from "../association-model";

export default class EventTicketModel extends MessageWrapModel {
    id:number;
    name: string;
    description: string;
    ticketType: string;
    ticketTypes: string[]
    numberOfTickets: number;
    peopleAllowedPerTicket: number;
    adminIssue: string;
    visibleToPublic: string;
}
