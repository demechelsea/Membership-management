import { AssociationDTO } from "./AssociationDTO";
import { UserDetailDTO } from "./UserDetailDTO";
import MembershipPlanDTO from "./membershipPlanDTO";
import { MessageWrapModel } from "./messageWrapModel";
import { PageModel } from "./page-model";
export class AssociationMemberDTO  extends MessageWrapModel {
    id:number;
    association: AssociationDTO ;
    userDetail: UserDetailDTO;
    title: string;
    firstName: string;
    parentName: string;
    displayName: string;
    dob: Date;
    gender: string;
    membershipPlan: MembershipPlanDTO;
    maritalStatus: string;
    primaryEmail: string;
    primaryPhone: string;
    membershipPlanId: number;
    introducerUser: number;
    status: string;
    approvedDate: Date;
    onlineAccessFlg: string;
    highestEducation: string;
    photoLink: string;
    page: PageModel;
    photo: string;
}
