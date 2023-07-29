import { AssociationDTO } from "./AssociationDTO";
import { MessageWrapModel } from "./messageWrapModel";

export class EmailSubscriptionDTO extends MessageWrapModel {
    emailId: string;
    eventsFlag: string;
    promotionalFlag: string;
    status: string;
    association: AssociationDTO;
}

