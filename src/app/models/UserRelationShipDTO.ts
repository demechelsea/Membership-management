import { UserDetailDTO } from "./UserDetailDTO";
import { MessageWrapModel } from "./messageWrapModel";
export class UserRelationShipDTO extends MessageWrapModel {
    id:number;
    relationshipType: number;
    fromUserDetail: UserDetailDTO;
    toUserDetail: UserDetailDTO;
}
