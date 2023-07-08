import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
import { PageModel } from "./page-model";
export class MessageSettingDTO extends MessageWrapModel {
  id:number;
  smsName: string;
  smsIdentify: string;
  whatsappNumber: string;
  association: AssociationDTO;
  page: PageModel;
}