import { AddressModel } from './address-model';
import { AssociationModel } from './association-model';
import LableValueModel from './lable-value-model';

import { MessageWrapModel } from './message-wrap-model';
import { PageModel } from './page-model';
import { UserDetailsModel } from './user-details-model';

export class UserViewModel extends MessageWrapModel {

    page: PageModel;

    encryptedId: string;
    encryptedRefId: string;
    encryptedAssociationId:string;
    authToken: string;
    emailId: string;
    phone: string;
    password: string;
    statusStr: string;
    appUserFlag: string;

    userDetail: UserDetailsModel;
    association: AssociationModel;
    mappedAssociation: AssociationModel[];
    roles: LableValueModel[];
    applications: LableValueModel[];
    addresses: AddressModel[];
}
