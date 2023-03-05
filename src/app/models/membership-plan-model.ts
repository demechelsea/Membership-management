import { MessageWrapModel } from './message-wrap-model';
import { PageModel } from './page-model';

export class MemershipPlanModel extends MessageWrapModel {

    page: PageModel;
    
    encryptedId: string;
    encryptedRefId: string;
    membershipPlanName: string;
    description:string;
    membershipFee:string;
    status:string;
    activeSubscriptions:string;
    updatedOn:string;
    updateBy:string;

    
}
