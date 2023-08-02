import { MessageWrapModel } from '../messageWrapModel';

export default class EventDTO extends MessageWrapModel {
    id:number;
    startDate:Date;
    startTime: Date;
    endDate:Date;
    endTime: Date;
    name: string;
    status:string;
    imageUrl: string;
    location: string;
    locationTimezone: string;
    ticketCost: number;
    saleEndDate: Date;
    ticketsAvailable: number;
    availableToPublic: boolean;
    description: string;
}
