import { MessageWrapModel } from './messageWrapModel';

export class AssociationSetting extends MessageWrapModel {
    
    id: bigint;
    encryptedId: string;
    timeZoneKey:string;
    timeZoneValue:string;
    languageKey:string;
    languageValue:string;
    currencyKey:string;
    currencyValue:string;
    dateFormat:string;
    logoLink:string;
    favIconLink:string;
    facebookUrl: string;
    linkedInUrl: string;
    instagramUrl: string;
    twitterPageUrl:string;
    localName:string;
    publicRegistrationFlg:string;

}
