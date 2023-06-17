import { MessageWrapModel } from "./messageWrapModel";
import { PageModel } from "./page-model";
export class AssociationDTO extends MessageWrapModel {
    encryptedRefId: string;
    name: string;
    place: string;
    shortName: string;
    website: string;
    soceityRaxUrl: string;
    status: string;
    setting: null;
    page: PageModel;
}