import { AssociationModel } from './association-model';
import { MessageWrapModel } from './message-wrap-model';
import { PageModel } from './page-model';

export default class MembershipPlanDTO extends MessageWrapModel {
    id:number;
    planName: string;
    description:string;
    fee:number;
    interval:string;
    familyMemberIncluded:string;
    autoPymtRemainder:string;
    availableForGeneralPublic:string;
    sendEmailNotification:string;
    activeSubscriptions:string;
    benefits:string;
    notifySubscribers: string;
    association: AssociationModel;
    status:string;
    createdUser:string;
    autoApproveApplicants: string;
    modifiedTimestamp: Date;
    modifiedUser:string;

}
