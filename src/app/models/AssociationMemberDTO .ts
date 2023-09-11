import { AssociationDTO } from "./AssociationDTO";
import { UserDetailDTO } from "./UserDetailDTO";
import MembershipPlanDTO from "./membershipPlanDTO";
import { MessageWrapModel } from "./messageWrapModel";
import { PageModel } from "./page-model";
export class AssociationMemberDTO  extends MessageWrapModel {
    id:number;
    association: AssociationDTO ;
    userDetail: UserDetailDTO;
    membershipPlan: MembershipPlanDTO;
    introducerUser: BigInteger;
    status: string;
    approvedDate: Date;
    membershipPlanId: number;
    onlineAccessFlg: string;
    highestEducation: string;
    photoLink: string;
    page: PageModel;
    photo: string;
}

