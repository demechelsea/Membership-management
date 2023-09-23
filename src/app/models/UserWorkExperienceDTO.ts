import { MessageWrapModel } from "./messageWrapModel";
export class UserWorkExperienceDTO extends MessageWrapModel {
    id:number;
    userDetailId: number;
    startDate: Date;
    endDate: Date;
    jobTitle: string;
    companyName: string;
    responsibilities: string;
}
