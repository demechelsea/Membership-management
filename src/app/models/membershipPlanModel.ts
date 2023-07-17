import { AssociationModel } from './association-model';
import { MessageWrapModel } from './messageWrapModel';
import { PageModel } from './page-model';

export default class MemershipPlanModel extends MessageWrapModel {
    id:number;
    page: PageModel;
    encryptedId: string;
    planName: string;
    description:string;
    fee:number;
    interval:string;
    familyMemberIncluded:string;
    autoPymtRemainder:string;
    availableForGeneralPublic:string;
    sendEmailNotification:string;
    authApproveSubscribers: string;
    benefits:string;
    status:string;
    activeSubscriptions:string;
    updatedOn:string;
    updateBy:string;
    notifySubscribers: string;
    association: AssociationModel;
    createdUser:string;
    createdTimestamp:string;
    modifiedTimestamp: Date;
    modifiedUser:string;
}
