import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
import { PageModel } from "./page-model";
export class EmailHistoryDTO extends MessageWrapModel {
      emailSubject: string;
      emailContent:string;
      recipients:string;
      modifiedTimestamp: Date;
      association:AssociationDTO;
      page:PageModel;
}
