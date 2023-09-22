import { UserDetailDTO } from "./UserDetailDTO";
import { MessageWrapModel } from "./messageWrapModel";
export class UserRelationShipDTO extends MessageWrapModel {
    id:number;
    relationshipType: string;
    fromUserDetail: UserDetailDTO;
    toUserDetail: UserDetailDTO;
}
