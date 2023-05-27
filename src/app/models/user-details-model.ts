import { MessageWrapModel } from './message-wrap-model';

export class UserDetailsModel extends MessageWrapModel {

    id: bigint;
    encryptedId: string;
    title: string;
    firstName: string;
    surName: string;
    displayName: string;
    dateofBirth: string;
    gender: string;
    maritalStatus: string;
}
