import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import LableValueModel from 'app/models/lable-value-model';
import {Observable, from, lastValueFrom, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Urls} from '../utils/urls';
import {BaseService} from './base.service';


@Injectable({
    providedIn: 'root'
})
export class HttpAppDataService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }


    fetchData(getUrl: string, inputParams?: any): Observable<any> {
        return this.httpClient.get<any>(getUrl, {
            headers: this.prepareCustomHeaders(),
            responseType: "json",
            params: inputParams
        })
            .pipe(
                catchError(this.handleError)
            );
    }

    postData(postUrl: string, inputParams: any, responseType: 'json' | 'blob' = 'json'): Observable<any> {

        console.log(inputParams instanceof FormData);
        return this.insertData(postUrl, inputParams, responseType, inputParams instanceof FormData);
    }

    putData(postUrl: string, inputParams: any, responseType: 'json' | 'blob' = 'json'): Observable<any> {
        return this.editData(postUrl, inputParams, responseType);
    }

    async postPromise(postUrl: string, inputParams: any, responseType: 'json' | 'blob' = 'json'): Promise<any> {
        return await lastValueFrom(from(this.postData(postUrl, inputParams)));
    }

    insertData(createUrl: string, inputParams: any, responseType: 'json' | 'blob' = 'json', isFormData: boolean = false): Observable<any> {
        return this.httpClient.post<any>(createUrl, inputParams, {
            headers: this.prepareCustomHeaders(null, isFormData),
            responseType: responseType as any
        })
            .pipe(
                catchError(this.handleError)
            );
    }

    editData(editUrl: string, inputParams: any, responseType: 'json' | 'blob' = 'json'): Observable<any> {
        return this.httpClient.put<any>(editUrl, inputParams, {
            headers: this.prepareCustomHeaders(),
            responseType: responseType as any
        })
            .pipe(
                catchError(this.handleError)
            );
    }


    postDataIntoHeaderData(createUrl: string, keyValueMap: LableValueModel[]): Observable<any> {
        let httpHeaders = this.prepareCustomHeaders(keyValueMap);
        //it needs to submit empty JSON object
        return this.httpClient.post<any>(createUrl, {"applications": Urls.APPLICATIONS}, {
            headers: httpHeaders,
            responseType: "json",
            withCredentials: false
        }).pipe(
                catchError(this.handleError)
            );
    }

    
    prepareCustomHeaders(keyValueMap?: LableValueModel[], isFormData: boolean = false): HttpHeaders {
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
        if (!isFormData){
           httpHeaders = httpHeaders.set("Content-Type", "application/json");
        }

        return httpHeaders;
    }


    deleteData(deleteUrl: string, inputParams?: any): Observable<any> {
        return this.httpClient.delete<any>(deleteUrl, {
            headers: this.prepareCustomHeaders(),
            responseType: "json",
            params: inputParams
        })
            .pipe(
                catchError(this.handleError)
            );
    }

    updateData(updateUrl: string, inputParams: any): Observable<any> {
        return this.httpClient.delete<any>(updateUrl, {
            headers: this.prepareCustomHeaders(),
            responseType: "json",
            params: inputParams
        })
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
