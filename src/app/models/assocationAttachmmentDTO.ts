import { MessageWrapModel } from "./messageWrapModel";

export class AssociationDocstoreDTO extends MessageWrapModel{
    assocId:number;
    docType: String;
    docName: String;
    docLink: String;
    status: String;
    displayToPublicFlg: string;
    modifiedTimestamp: Date;
}


