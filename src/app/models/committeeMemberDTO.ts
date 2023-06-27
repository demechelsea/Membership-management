import { AssociationMemberDTO } from "./AssociationMemberDTO ";
import CommitteeDTO from "./committeeDTO";
import { CommitteePositionDTO } from "./committeePositionDTO";
import { MessageWrapModel } from "./messageWrapModel";
import { PageModel } from "./page-model";

export class CommitteeMemberDTO extends MessageWrapModel {
    id: number;
    committee: CommitteeDTO;
    associationMember: AssociationMemberDTO;
    committeePosition: CommitteePositionDTO;
    preferredNameDisplay: String;
    phoneVisibilityFlg: string;
    emailVisibilityFlg: string;
    startDate: Date;
    endDate: Date;
    photoLink: String;
    page: PageModel;
}