import { MessageWrapModel } from '../messageWrapModel';

export default class EventDTO extends MessageWrapModel {
    id:number;
    encryptedId:string;
    startDate:Date;
    startTime: Date;
    endDate:Date;
    endTime: Date;
    name: string;
    status:string;
    imageUrl: string;
    eventImageLink: string;
    location: string;
    locationTimezone: string;
    ticketCost: number;
    saleEndDate: Date;
    ticketsAvailable: number;
    rsvpCount: number;
    ticketsIssued: number;
    totalTicketsCollected: number;
    availableToPublic: boolean;
    description: string;

    startTimeLabel: string;
    endTimeLabel: string;
}
