import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
import { PageModel } from "./page-model";
export class EmailHistoryDTO extends MessageWrapModel {
      emailSubject: string;
      emailContent:string;
      recipients:string;
      association:AssociationDTO;
      page:PageModel;
}
