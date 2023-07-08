import { UserDetailDTO } from './UserDetailDTO';
import { MessageWrapModel } from './messageWrapModel';

export default class PermissionDTO extends MessageWrapModel {
    id:number;
    groupName:string;
    permissionName:string;
}
