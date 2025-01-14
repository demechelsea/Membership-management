import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import { notNull, nullObj } from 'app/common/utils/string-utils';
import { Urls } from 'app/common/utils/urls';
import { AssociationModel } from 'app/models/association-model';
import { MessageWrapModel } from 'app/models/messageWrapModel';
import { RequestWrapperModel } from 'app/models/request-wrapper-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { plainToClass } from 'class-transformer';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationService extends HttpAppDataService {

  constructor(httpClient: HttpClient, private localStorageService: LocalstorageService) {
    super(httpClient);
  }

  public isValidAssoicationUSer(associatioModel: AssociationModel): Observable<any> {
    let requestWrapperModel: RequestWrapperModel = new RequestWrapperModel();
    requestWrapperModel.inputData = associatioModel.encryptedId;
    return this.postData(Urls.USER_BELONGS_TO_ASSOICATION, requestWrapperModel);
  }

  public createNewAssociation(associatioModel: AssociationModel): Observable<any> {
    return this.postData(Urls.CREATE_ASSOCIATION, associatioModel);
  }

  public retrieveMappedAssociations(): Observable<ResultViewModel> {
    return this.postData(Urls.RETRIEVE_MAPPED_ASSOCIATION,{});
  }
  
  public retrieveAllAssociations(requestWrapper: RequestWrapperModel): Observable<ResultViewModel> {
    return this.postData(Urls.FETCH_ASSOC_BY_SEARCH_TEXT, requestWrapper);
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
