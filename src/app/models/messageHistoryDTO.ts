import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
import { PageModel } from "./page-model";
export class MessageHistoryDTO extends MessageWrapModel {
  from: string;
  msgSubject:string;
  msgContent:string;
  recipients:string;
  modifiedTimestamp: Date;
  association:AssociationDTO;
  page:PageModel;

}