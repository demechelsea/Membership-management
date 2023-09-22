import { MessageWrapModel } from "./messageWrapModel";
export class UserCompanyDTO  extends MessageWrapModel {
    userDetailId:number;
    companyName: string;
    shortName: string;
    website: string;
    logoLink: string;
    facebookPageUrl: string;
    linkedinPageUrl: string;
    instagramPAgeUrl: string;
    twitterPageUrl: string;
    address: string;
    category: string;
}
