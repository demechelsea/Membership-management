import { MessageWrapModel } from "./messageWrapModel";
export class UserContactDTO extends MessageWrapModel {
    id:number;
    contactType: string;
    emailId: string;
    phoneNumber: string;
    emailVerified: string;
    phoneVerified: string;
    userDetailId: string;
}

