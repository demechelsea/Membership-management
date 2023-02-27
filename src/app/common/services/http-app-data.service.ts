import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KeyValueModel } from 'app/models/key-value-model';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class HttpAppDataService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
   }

  fetchData(getUrl: string, inputParams?: any): Observable<any> {
    return this.httpClient.get<any>(getUrl, { responseType: "json", params: inputParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  postData(postUrl: string, inputParams: any): Observable<any> {
    return this.insertData(postUrl, inputParams);
  }

  insertData(createUrl: string, inputParams: any): Observable<any> {
    return this.httpClient.post<any>(createUrl, inputParams, { responseType: "json" })
      .pipe(
        catchError(this.handleError)
      );
  }

  postDataIntoHeaderData(createUrl: string, keyValueMap: KeyValueModel[]): Observable<any> {
    let httpHeaders = new HttpHeaders();
    for (let i = 0; i < keyValueMap.length; i++) {
       let keyValueObj  = keyValueMap[i];
       if(keyValueObj.name!=null){
        httpHeaders=httpHeaders.append(keyValueObj.id, keyValueObj.name);
       }
    }
    //httpHeaders =httpHeaders.append("Access-Control-Allow-Origin", "*");
    httpHeaders =httpHeaders.append('Content-Type', 'text/plain,application/json');  

    //it needs to submit empty JSON object
    return this.httpClient.post<any>(createUrl,{}, {headers:httpHeaders, responseType:"json",withCredentials:true})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteData(deleteUrl: string, inputParams?: any): Observable<any> {
    return this.httpClient.delete<any>(deleteUrl, { responseType: "json", params: inputParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateData(updateUrl: string, inputParams: any): Observable<any> {
    return this.httpClient.delete<any>(updateUrl, { responseType: "json", params: inputParams })
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
