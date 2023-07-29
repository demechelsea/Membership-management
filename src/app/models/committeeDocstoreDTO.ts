import { MessageWrapModel } from "./messageWrapModel";
export class CommitteeDocstoreDTO extends MessageWrapModel{
    id:number;
    committeeId: number;
    docType: String;
    docName: String;
    docLink: String;
    displayToPublicFlg: string;
    modifiedTimestamp: Date;
    file:File;
    files:File[];
    status: string;
}