import { MessageWrapModel } from './messageWrapModel';

export class ResetPasswordModel extends MessageWrapModel {

    encryptedId: string;
    encryptedRefId: string;
    authToken: string;
    userName: string;
    emailId: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    status: string;
    otp: string;

}
