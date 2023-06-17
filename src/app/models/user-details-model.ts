import { MessageWrapModel } from './messageWrapModel';

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
