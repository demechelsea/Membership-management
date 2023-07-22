import { MessageWrapModel } from './messageWrapModel';

export default class RoleDTO extends MessageWrapModel {
    id:number;
    name:string;
    isSuperAdmin: boolean;
    checked: boolean;
}
