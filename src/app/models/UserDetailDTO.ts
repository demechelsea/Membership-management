
import { MessageWrapModel } from "./messageWrapModel";


export class UserDetailDTO extends MessageWrapModel {
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