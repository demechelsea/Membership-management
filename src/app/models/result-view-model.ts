import { MessageWrapModel } from './message-wrap-model';
import { PageModel } from './page-model';

export class ResultViewModel extends MessageWrapModel {
    page: PageModel;
    result: any;
}