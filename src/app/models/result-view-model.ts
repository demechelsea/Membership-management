import { MessageWrapModel } from './messageWrapModel';
import { PageModel } from './page-model';

export class ResultViewModel extends MessageWrapModel {
    page: PageModel;
    result: any;
}