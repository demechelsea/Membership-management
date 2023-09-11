import { AssociationDTO } from "./AssociationDTO";
import { UserDetailDTO } from "./UserDetailDTO";
import { MessageWrapModel } from "./messageWrapModel";
import { PageModel } from "./page-model";
export class FamilyMemberDTO  extends MessageWrapModel {
    id:number;
    association: AssociationDTO ;
    userDetail: UserDetailDTO;
    introducerUser: BigInteger;
    canLoginToAssoc: string;
    highestEducation: string;
    occupation: string;
    relationshipType: string;
    photoLink: string;
    page: PageModel;
    photo: string;
}