import { MessageWrapModel } from "../messageWrapModel";

export default class EventProgramDTO extends MessageWrapModel {
    id:number;
    eventId: number;
    name: string;
    description: string;
    participants: string;
    contactPerson: string;
    contactPhone: string;
    status: string;
    startTime: string;
    endTime: string;
    duration: string;

}
