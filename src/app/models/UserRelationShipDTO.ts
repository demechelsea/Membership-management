import { UserDetailDTO } from "./UserDetailDTO";
import { MessageWrapModel } from "./messageWrapModel";
export class UserRelationShipDTO extends MessageWrapModel {
    id:number;
    toUserDetailId:number;
    title: string;
    firstName: string;
    parentName: string;
    displayName: string;
    dob: string;
    gender: string;
    maritalStatus: string;
    primaryEmail: string;
    primaryPhone: string;
    relationshipType: string;
    canLoginToAssoc: string;
    highestEducation: string;
    occupation: string;
    photoLink: string;
    fromUserDetail: UserDetailDTO;
    toUserDetail: UserDetailDTO;
    photo: string;
}
