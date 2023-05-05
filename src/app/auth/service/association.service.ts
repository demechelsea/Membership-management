import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationModel } from 'app/models/association-model';
import LableValueModel from 'app/models/lable-value-model';
import { MessageWrapModel } from 'app/models/message-wrap-model';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationService extends HttpAppDataService {
  public messages:MessageWrapModel = new MessageWrapModel();
  subscription: Subscription;
  
  constructor(httpClient: HttpClient, private localStorageService: LocalstorageService) {
    super(httpClient);
  }

  public retrieveAndStoreAssociationContext(assocContextPath:string){
    if(assocContextPath !=null && assocContextPath != 'undefined'){
      let keyValueModelMap = [];
    let contextPathParam: LableValueModel = new LableValueModel();
    contextPathParam.id = "assocContextPath";
    contextPathParam.name = assocContextPath;
    keyValueModelMap.push(contextPathParam);
    this.subscription = this.postData(Urls.FETCH_ASSOC_BY_CONTEXTPATH, keyValueModelMap).subscribe(
      (response) => {
        //setting the messages 
        Object.assign(this.messages, response);
        if(this.messages.isSuccess){
          let associatioModel:AssociationModel = new AssociationModel();
          Object.assign(associatioModel, response['result']);
          this.localStorageService.setContextAssociation(associatioModel);
        }
      });

    }
    
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
