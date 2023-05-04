import { Injectable } from '@angular/core';
import { AssociationModel } from 'app/models/association-model';
import { UserViewModel } from 'app/models/user-view-model';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  loggedInUser: UserViewModel = new UserViewModel();
  
  constructor() { }

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


  logout() {
    sessionStorage.removeItem("societyRaxAuthenticatedUser");
    this.loggedInUser = null;
   
  }
}
