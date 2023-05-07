import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LableValueModel from 'app/models/lable-value-model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from './base.service';
import { Urls } from '../utils/urls';
import { UserViewModel } from 'app/models/user-view-model';
import { AssociationModel } from 'app/models/association-model';
import { notNull } from '../utils/string-utils';



@Injectable({
  providedIn: 'root'
})
export class HttpAppDataService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }


  fetchData(getUrl: string, inputParams?: any): Observable<any> {
    return this.httpClient.get<any>(getUrl, { headers: this.prepareCustomHeaders(), responseType: "json", params: inputParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  postData(postUrl: string, inputParams: any): Observable<any> {
    return this.insertData(postUrl, inputParams);
  }

  insertData(createUrl: string, inputParams: any): Observable<any> {
    return this.httpClient.post<any>(createUrl, inputParams, { headers: this.prepareCustomHeaders(), responseType: "json" })
      .pipe(
        catchError(this.handleError)
      );
  }

  postDataIntoHeaderData(createUrl: string, keyValueMap: LableValueModel[]): Observable<any> {
    let httpHeaders = this.prepareCustomHeaders(keyValueMap);
    //it needs to submit empty JSON object
    return this.httpClient.post<any>(createUrl, { "applications": Urls.APPLICATIONS }, { headers: httpHeaders, responseType: "json", withCredentials: false })
      .pipe(
        catchError(this.handleError)
      );
  }

  prepareCustomHeaders(keyValueMap?: LableValueModel[]): HttpHeaders {
    let keyValueModelMap = this.getDefaultCustomHeaders();

    if (keyValueMap != null && keyValueMap != undefined) {

      keyValueModelMap = keyValueModelMap.concat(keyValueMap);
    }

    let httpHeaders = new HttpHeaders();
    for (let i = 0; i < keyValueModelMap.length; i++) {
      let keyValueObj = keyValueModelMap[i];
      if (keyValueObj.name != null) {
        httpHeaders = httpHeaders.set(keyValueObj.id, keyValueObj.name);
      }
    }
    return httpHeaders;
  }

  private getDefaultCustomHeaders() {
    const keyValueModelMap = [];
    keyValueModelMap.push(new LableValueModel('X-Auth-Access-client', 'SORAX_UI_ANGULAR'));
    keyValueModelMap.push(new LableValueModel('X-Header-Info', 'npm install ngx-device-detector --save after upgrade'));
    keyValueModelMap.push(new LableValueModel('X-User-Agent', navigator.userAgent));
    if(notNull(this.getAssociationId())){
       keyValueModelMap.push(new LableValueModel('X-Association-id', this.getAssociationId()));
    }
   
    return keyValueModelMap;
  }

  deleteData(deleteUrl: string, inputParams?: any): Observable<any> {
    return this.httpClient.delete<any>(deleteUrl, { headers: this.prepareCustomHeaders(), responseType: "json", params: inputParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateData(updateUrl: string, inputParams: any): Observable<any> {
    return this.httpClient.delete<any>(updateUrl, { headers: this.prepareCustomHeaders(), responseType: "json", params: inputParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(error);
  }

  getAssociationId(): string {
    let authenticatedUserJsonString = sessionStorage.getItem("societyRaxAuthenticatedUser");
    if (authenticatedUserJsonString != null) {
      let loggedInUser: UserViewModel = JSON.parse(authenticatedUserJsonString);
      return loggedInUser.association!.encryptedId;
    } else {
      let contextAssociationStr = sessionStorage.getItem("contextAssociation");;
      let contextAssociation: AssociationModel = JSON.parse(contextAssociationStr);;
      return contextAssociation?.encryptedId;
    }
  }

  isLoggedIn(): boolean {
    let authenticatedUserJsonString = sessionStorage.getItem("societyRaxAuthenticatedUser");
    if (authenticatedUserJsonString != null) {
      let loggedInUser: UserViewModel = JSON.parse(authenticatedUserJsonString);
      return (loggedInUser != null && loggedInUser.authToken != null);
    }
    return false;
  }
}
