import { Injectable } from '@angular/core';
import { AssociationModel } from 'app/models/association-model';
import { UserViewModel } from 'app/models/user-view-model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  loggedInUser: UserViewModel = new UserViewModel();
  
  constructor() { }

    
  setContextAssociation(contextAssociation: AssociationModel) {
    let contextAssociationStr = JSON.stringify(contextAssociation);
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

  isPartialLoggedIn(): boolean {
    this.updateLoggedInUser();
    return this.loggedInUser?.authToken != null;
  }

  private updateLoggedInUser() {
    let authenticatedUserJsonString = sessionStorage.getItem("societyRaxAuthenticatedUser");
    if (authenticatedUserJsonString != null) {
      this.loggedInUser = JSON.parse(authenticatedUserJsonString);
    }
  }

  isLoggedIn(): boolean {
    this.updateLoggedInUser();

    return (this.loggedInUser?.authToken != null
              && this.loggedInUser?.association?.encryptedId != null);
  }

  getAssociation(): AssociationModel {
    this.updateLoggedInUser();
    return this.loggedInUser!.association;
  }

  getContextAssociation():AssociationModel {
    let contextAssociationStr = sessionStorage.getItem("contextAssociation");;
    return JSON.parse(contextAssociationStr);;
  }


  logout() {
    sessionStorage.removeItem("societyRaxAuthenticatedUser");
    this.loggedInUser = null;
   
  }
}
