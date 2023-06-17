import { MessageViewModel } from './messageViewModel';

export class MessageWrapModel {
    availableActions:string[];
    performAction:string;    
    exception: boolean;
    businessErrors: boolean;
    validationErrors: boolean;
    successMessages: boolean;
    messages: MessageViewModel[];

    isSuccess(): boolean {
        return !this.exception && !this.businessErrors && !this.validationErrors;
    }
}