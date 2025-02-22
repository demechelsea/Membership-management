import { Injectable } from '@angular/core';
import { MessageViewModel } from '../../models/messageViewModel';
import { MessageWrapModel } from '../../models/messageWrapModel';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public static baseMessages:MessageWrapModel = new MessageWrapModel();

  createSuccessMessage(message: string): MessageWrapModel {
    let messageWrapModel = new MessageWrapModel();
      let messageViewModel = new MessageViewModel();
      messageViewModel.type = "SUCCESS";
      messageViewModel.message = message;
    messageWrapModel.successMessages = true;
    messageWrapModel.messages = [messageViewModel];
    return messageWrapModel;
  }

  createErrorMessage(message: string): MessageWrapModel {
  let messageWrapModel = new MessageWrapModel();
      let messageViewModel = new MessageViewModel();
      messageViewModel.type = "BUSINESS_ERROR";
      messageViewModel.message = message;
    messageWrapModel.businessErrors = true;
    messageWrapModel.messages = [messageViewModel];
    return messageWrapModel;
  }
  
  clearBaseMessages(){
    BaseService.baseMessages.messages =[];    
  }

}
