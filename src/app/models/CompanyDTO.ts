import { MessageWrapModel } from './messageWrapModel';

export default class CompanyDTO extends MessageWrapModel {
    id:number;
    name: string;
    email: string;
    phone: string;
}
