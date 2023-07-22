import { AssociationModel } from './association-model';
import { MessageWrapModel } from './messageWrapModel';
import { PageModel } from './page-model';

export default class CommitteeDTO extends MessageWrapModel {
    id:number;
    startDate:Date;
    endDate:Date;
    teamSize: number;
    name: string;
    status:string;
    page: PageModel;
    association: AssociationModel;
    leaderName:string;
}
