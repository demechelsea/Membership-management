import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
import { PageModel } from "./page-model";
export class EmailTemplateDTO extends MessageWrapModel {
      id: number;
      templateName: string;
      subject:string;
      content:string;
      placeHolders:string;
      association:AssociationDTO;
      page:PageModel;
}