import { Injectable } from '@angular/core';
import { AssociationModel } from 'app/models/association-model';
import { UserViewModel } from 'app/models/user-view-model';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  loggedInUser: UserViewModel = new UserViewModel();
  contextAssociation:AssociationModel =new AssociationModel();
  
  constructor() { }

    
  setContextAssociation(contextAssociation: AssociationModel) {
    let contextAssociationStr = JSON.stringify(contextAssociation);
    this.loggedInUser = JSON.parse(contextAssociationStr);
    sessionStorage.contextAssociation = contextAssociationStr;
  }
  
  setAuthenticationToken(authenticatedUser: UserViewModel) {
    let authenticatedUserJsonString = JSON.stringify(authenticatedUser);
    this.loggedInUser = JSON.parse(authenticatedUserJsonString);
    sessionStorage.societyRaxAuthenticatedUser = authenticatedUserJsonString;   
  }

  getLoggedInUser():UserViewModel{
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {
    let authenticatedUserJsonString = sessionStorage.getItem("societyRaxAuthenticatedUser");
    if (authenticatedUserJsonString != null) {
      this.loggedInUser = JSON.parse(authenticatedUserJsonString);
    }

    return (this.loggedInUser != null && this.loggedInUser.authToken != null);
  }

  getAssociation(): AssociationModel {
    let authenticatedUserJsonString = sessionStorage.getItem("societyRaxAuthenticatedUser");
    if (authenticatedUserJsonString != null) {
      this.loggedInUser = JSON.parse(authenticatedUserJsonString);
    }
    return this.loggedInUser!.association;
  }

  getContextAssociation() {
    let contextAssociationStr = sessionStorage.getItem("contextAssociation");;
    this.contextAssociation = JSON.parse(contextAssociationStr);
    return this.contextAssociation;
  }


  logout() {
    sessionStorage.removeItem("societyRaxAuthenticatedUser");
    this.loggedInUser = null;
   
  }
}
