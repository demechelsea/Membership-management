import { MessageWrapModel } from './message-wrap-model';

export class AssociationModel extends MessageWrapModel {
    id: bigint;
    encryptedId: string;
    name: string;
    place:string;
    
    websiteAddress: string;
    status: string;
    statusDt: string;
    panNumber: string;
    epfNumber: string;
    esiNumber: string;
    cinRegNumber: string;
    phone: string;
    email: string;
}
