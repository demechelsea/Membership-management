import { Injectable } from '@angular/core';
import { MessageViewModel } from '../../models/message-view-model';
import { MessageWrapModel } from '../../models/message-wrap-model';

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
  
  clearBaseMessages(){
    console.log("Cleared messages IN BASE SERVICE");
    BaseService.baseMessages.messages =[];    
  }

}
