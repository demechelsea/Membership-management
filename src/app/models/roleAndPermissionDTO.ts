import { UserDetailDTO } from './UserDetailDTO';
import { MessageWrapModel } from './messageWrapModel';
import PermissionDTO from './permissionDTO';
import RoleDTO from './roleDTO';

export default class RoleAndPermissionDTO extends MessageWrapModel {
    id:number;
    allPermissions:PermissionDTO[];
    allRoles:RoleDTO[];
    userPermissions: PermissionDTO[];
    userRoles: RoleDTO[];
    userDetail:UserDetailDTO;
}


