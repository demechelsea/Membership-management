import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
export class MessageHistoryDTO extends MessageWrapModel {
  msgSubject:string;
  msgContent:string;
  recipients:string;
  association:AssociationDTO;
}