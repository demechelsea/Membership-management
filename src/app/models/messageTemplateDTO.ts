import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
import { PageModel } from "./page-model";
export class MessageTemplateDTO extends MessageWrapModel {
      id:number;
      name:string;
      subject:string;
      content:string;
      placeHolders:string;
      primary:string;
      association:AssociationDTO;
      page:PageModel;
      enableAutoFlg:string;
}