import { MessageViewModel } from './message-view-model';

export class MessageWrapModel {

    exception: boolean;
    businessErrors: boolean;
    validationErrors: boolean;
    successMessages: boolean;
    messages: MessageViewModel[];

    isSuccess(): boolean {
        return !this.exception && !this.businessErrors && !this.validationErrors;
    }
}