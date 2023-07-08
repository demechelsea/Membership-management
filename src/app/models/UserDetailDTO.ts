
import { MessageWrapModel } from "./messageWrapModel";


export class UserDetailDTO extends MessageWrapModel {
    id: number;
    firstName: String;
    givenName: String;
    parentName: String;
    displayName: string;
    dob: String;
    gender: String;
    maritalStatus: String;
    occupation: String;
    primaryEmail: String;
    primaryPhone: String;
    associationId: number;
    title: string;
    surName: string;
}