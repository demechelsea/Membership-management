import { MessageWrapModel } from './messageWrapModel';

export default class WebsiteInfoModel extends MessageWrapModel {
    encryptedId:string;
    themeName:string;
    htmlContent:string;
    status:string;
    modifiedUser:string;
    modifiedTimestamp: string;
}
