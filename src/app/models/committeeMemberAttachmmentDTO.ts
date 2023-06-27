import CommitteeDTO from "./committeeDTO";

export class CommitteeMemberAttachmentDTO {
    id:number;
    committee: CommitteeDTO;
    docType: String;
    docName: String;
    docLink: String;
    displayToPublicFlg: string;
    modifiedTimestamp: Date;
}