import { MessageWrapModel } from "./messageWrapModel";
export class UserEducationDTO extends MessageWrapModel {
    id:number;
    userDetailId: number;
    graduationDate: Date;
    institutions: string;
    degree: string;
    fieldOfStudy: string;
}
