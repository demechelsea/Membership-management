import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserViewModel } from 'app/models/user-view-model';
import { AssociationModel } from 'app/models/association-model';
import { notNull } from 'app/common/utils/string-utils';

@Injectable({
  providedIn: 'root'
})
export class SoraxHttpInterceptorService implements HttpInterceptor{

  constructor() { }
  
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    let authToken="";
    let authenticatedUserJsonString =sessionStorage.getItem("societyRaxAuthenticatedUser");
    if( authenticatedUserJsonString!=null){
      authToken = JSON.parse( authenticatedUserJsonString).authToken;
      httpRequest= httpRequest.clone({
        setHeaders:{
          "X-Auth-Token":authToken
        }
      });    
    } 

    httpRequest = this.setGeneralHeaders(httpRequest);
    httpRequest = this.setAssociataionId(httpRequest);
    
    return next.handle(httpRequest);
  }

  private setAssociataionId(httpRequest: HttpRequest<any>) {
    if (notNull(this.getAssociationId())) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          "X-Association-id": this.getAssociationId()
        }
      });
    }
    return httpRequest;
  }

  private setGeneralHeaders(httpRequest: HttpRequest<any>) {
    httpRequest = httpRequest.clone({
      setHeaders: {
        "X-Auth-Access-client": "SORAX_UI_ANGULAR",
        "X-Header-Info": "npm install ngx-device-detector --save after upgrade",
        "X-User-Agent": navigator.userAgent
      }
    });
    return httpRequest;
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

}
