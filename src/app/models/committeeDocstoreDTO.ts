
export class CommitteeDocstoreDTO {
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