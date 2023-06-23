import { MessageWrapModel } from "./messageWrapModel";
import { AssociationDTO } from "./AssociationDTO";
import { PageModel } from "./page-model";
export class EmailSettingDTO extends MessageWrapModel {
    smtpHost: string;
    port: number;
    replyToEmail: string;
    emailId: string;
    password: string;
    sslEnabled: string;
    tslEnabled: string;
    signiture: string;
    association: AssociationDTO;
    page: PageModel;

}