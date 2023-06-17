import { MessageWrapModel } from './messageWrapModel';

export class AssociationSetting extends MessageWrapModel {
    
    id: bigint;
    encryptedId: string;
    dateFormat: string;
    logoLink:string;
    favIconLink:string;
    facebookUrl: string;
    linkedInUrl: string;
    instagramUrl: string;
    twitterPageUrl:string;
    localName:string;
    currency:string;
    publicRegistrationFlg:string;

}
