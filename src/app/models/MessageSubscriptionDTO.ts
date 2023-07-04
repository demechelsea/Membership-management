import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
import { PageModel } from "./page-model";
export class MessageSubscriptionDTO   extends MessageWrapModel {
    phoneNumber: string;
    smsMsgFlag: string;
    whatsAppFlag: string;
    status: string;
    association: AssociationDTO;
    page: PageModel;
}
