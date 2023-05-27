import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LableValueModel from 'app/models/lable-value-model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Urls } from '../utils/urls';
import { BaseService } from './base.service';
import { AssociationModel } from 'app/models/association-model';
import MembershipPlanDTO from 'app/models/membership-plan-DTO';



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
    /*
    let association = new AssociationModel();
    association.soceityRaxUrl = "fmg400210";

    let membershipPlanDTO = new MembershipPlanDTO();
    membershipPlanDTO=inputParams;
    membershipPlanDTO.association = association;
    membershipPlanDTO.discription = inputParams.description
    console.log(inputParams);
    const planJson = JSON.stringify(membershipPlanDTO);
    alert("posting");
    {
      planName:inputParams.planName,
      discription: inputParams.description,
      interval:inputParams.interval,
      fee: inputParams.fee,
      familyMemberIncluded:1 ,
      autoPymtRemainder:0,
      availableForGeneralPublic:1,
      sendEmailNotification:1,
      notifySubscribers:0,
      benefits: inputParams.benefits,

  association:association
}*/
console.log(inputParams)

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
    let keyValueModelMap = [];

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
    httpHeaders = httpHeaders.set("Content-Type", "application/json");
    return httpHeaders;
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

 

}
