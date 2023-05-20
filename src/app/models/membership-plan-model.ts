import { MessageWrapModel } from './message-wrap-model';
import { PageModel } from './page-model';

export default class MemershipPlanModel extends MessageWrapModel {

    page: PageModel;
    encryptedId: string;
    //planName: string;
   //description:string;
    //fee:string;
    //interval:string;
    //familyMemberIncluded:string;
    //autoPymtRemainder:string;
    ///availableForGeneralPublic:string;
    sendEmailNotification:string;
    autoApproveApplicants: string;
    //benefits:string;
    //status:string;
    activeSubscriptions:string;
    updatedOn:string;
    updateBy:string;
}
