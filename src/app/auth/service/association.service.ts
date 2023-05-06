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

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public retrieveAssociationByContextPath(assocContextPath: string): Observable<AssociationModel> {
    let associatioModel: AssociationModel = new AssociationModel();
    associatioModel.soceityRaxUrl = assocContextPath;
    return this.postData(Urls.FETCH_ASSOC_BY_CONTEXTPATH, associatioModel);

  }

  ngOnDestroy() {
   
  }
}
