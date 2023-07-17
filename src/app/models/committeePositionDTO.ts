import { AssociationDTO } from "./AssociationDTO";
import CommitteeDTO from "./committeeDTO";
import { MessageWrapModel } from "./messageWrapModel";
import { PageModel } from "./page-model";
import { ResultViewModel } from "./result-view-model";

export class CommitteePositionDTO  extends MessageWrapModel {
  id: number;
  association: AssociationDTO;
  positionName: string;
  positionRank: number;
  page: PageModel;
  result: any;
}