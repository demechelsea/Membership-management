
import { MessageWrapModel } from "./messageWrapModel";
export class UserDetailDTO extends MessageWrapModel {
    id: number;
    firstName: string;
    givenName: string;
    parentName: string;
    displayName: string;
    dob: string;
    gender: string;
    maritalStatus: string;
    occupation: string;
    primaryEmail: string;
    primaryPhone: string;
    associationId: number;
    title: string;
    surName: string;
}