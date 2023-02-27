import { MessageWrapModel } from '../models/message-wrap-model';

export class ResetPasswordModel extends MessageWrapModel {

    encryptedId: string;
    encryptedRefId: string;
    authToken: string;
    userName: string;
    emailId: string;
    phone: string;
    password: string;
    confirmPassword: string;
    status: string;
    otp: string;

}
