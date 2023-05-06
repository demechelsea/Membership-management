import { AssociationSetting } from './association-setting';
import { MessageWrapModel } from './message-wrap-model';

export class AssociationModel extends MessageWrapModel {

    id: bigint;
    encryptedId: string;
    name: string;
    place:string;
    societyRaxId:string;
    website: string;
    soceityRaxUrl: string;
    status: string;
    shortName:string;
    setting:AssociationSetting;

}
