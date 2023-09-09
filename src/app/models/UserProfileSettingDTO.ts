import { MessageWrapModel } from "./messageWrapModel";
export class UserProfileSettingDTO extends MessageWrapModel {
    id:number;
    userDetailId: number;
    emailNotificationFlg: string;
    mobileNotificationFlg: string;
    contactVisibility: string;
    photoLink: string;
    photoVisibility: string;
}
