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
    authToken: string;
    emailId: string;
    phone: string;
    password: string;
    statusStr: string;
    appUserFlag: string;

    userDetail: UserDetailsModel;
    organization: AssociationModel;
    roles: LableValueModel[];
    addresses: AddressModel[];
}
