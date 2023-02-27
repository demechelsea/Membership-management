import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoraxHttpInterceptorService implements HttpInterceptor{

  constructor() { }
  
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    let authToken="";
    let authenticatedUserJsonString =sessionStorage.getItem("smptAuthenticatedUser");
    if( authenticatedUserJsonString!=null){
      authToken = JSON.parse( authenticatedUserJsonString).authToken;
      httpRequest= httpRequest.clone({
        setHeaders:{
          "X-Auth-Token":authToken,
        }
      });
    
    }    
    return next.handle(httpRequest);
  }
}
