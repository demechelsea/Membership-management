import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import { notNull, nullObj } from 'app/common/utils/string-utils';
import { Urls } from 'app/common/utils/urls';
import { AssociationModel } from 'app/models/association-model';
import { MessageWrapModel } from 'app/models/message-wrap-model';
import { plainToClass } from 'class-transformer';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationService extends HttpAppDataService {

  constructor(httpClient: HttpClient, private localStorageService: LocalstorageService) {
    super(httpClient);
  }

  public retrieveAssociationByContextPath(assocContextPath: string): Observable<AssociationModel> {
    let associatioModel: AssociationModel = new AssociationModel();
    associatioModel.soceityRaxUrl = assocContextPath;
    return this.postData(Urls.FETCH_ASSOC_BY_CONTEXTPATH, associatioModel);
  }

  public setAssociationContextToLocalStorage(assocContextPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (notNull(assocContextPath)) {
        this.retrieveAssociationByContextPathPromise(assocContextPath).then((response) => {
          const messages: MessageWrapModel = new MessageWrapModel();
          Object.assign(messages, response);
          if (messages.isSuccess()) {
            const contextAssociation: AssociationModel = plainToClass(AssociationModel, response['result']);
            this.localStorageService.setContextAssociation(contextAssociation);
          } else {
            this.localStorageService.setContextAssociation(new AssociationModel());
          }
          resolve("Success");
        }).catch((error) => {
          reject("Failed");
        });
      } else {
        if(nullObj(this.localStorageService.getContextAssociation())){
          this.localStorageService.setContextAssociation(new AssociationModel());
        }
        resolve("Success");
      }
    });
  }

  private async retrieveAssociationByContextPathPromise(assocContextPath: string): Promise<AssociationModel> {
    const associatioModel: AssociationModel = new AssociationModel();
    associatioModel.soceityRaxUrl = assocContextPath;
    return await lastValueFrom(from(this.postData(Urls.FETCH_ASSOC_BY_CONTEXTPATH, associatioModel)));
  }

  ngOnDestroy() {

  }
}
