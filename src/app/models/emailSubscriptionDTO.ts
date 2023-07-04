import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
import { PageModel } from "./page-model";
export class EmailSubscriptionDTO  extends MessageWrapModel {
    emailId: string;
    eventsFlag: string;
    promotionalFlag: string;
    status: string;
    association: AssociationDTO;
    page: PageModel;
}

