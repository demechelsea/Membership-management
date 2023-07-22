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
  preferredNameDisplay: string;
  phoneVisibilityFlg: string;
  emailVisibilityFlg: string;
  committeeId: number;
  associationMemberId: number;
  committeePositionId: number;
  startDate: Date;
  endDate: Date;
  photoLink: string;
  page: PageModel;
  status: string;
}
