import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationModel } from 'app/models/association-model';
import LableValueModel from 'app/models/lable-value-model';
import { ResetPasswordModel } from 'app/models/reset-password-model';
import { UserViewModel } from 'app/models/user-view-model';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpAppDataService {

  public loginLogoutObservable: Observable<string>;
  public loginLogoutObservers: Observer<string>[] = [];

  loggedInUser: UserViewModel = new UserViewModel();

  constructor(httpClient: HttpClient, private localStorageService: LocalstorageService) {
    super(httpClient);

    this.loginLogoutObservable = Observable.create(
      (obsever: Observer<string>) => {
        this.loginLogoutObservers.push(obsever);
      });
  }


  public checkAuthentication(employeModel: UserViewModel): Observable<UserViewModel> {
    let keyValueModelMap = [];
    let userName: LableValueModel = new LableValueModel();
    userName.id = "x-auth-username";
    userName.name = employeModel.emailId;
    keyValueModelMap.push(userName);

    let password: LableValueModel = new LableValueModel();
    password.id = "x-auth-password";
    password.name = employeModel.password;
    keyValueModelMap.push(password);

    return this.postDataIntoHeaderData(Urls.LOGIN_URL, keyValueModelMap);
  }

  public verifyUser(resetPassword: ResetPasswordModel): Observable<ResetPasswordModel> {
    return this.postData(Urls.VERIFY_EMAIL, resetPassword);
  }

  public sendOtpForResetPassword(resetPassword: ResetPasswordModel): Observable<ResetPasswordModel> {
    return this.postData(Urls.SEND_OTP_PASSWORD, resetPassword);

  }

  public changePassword(resetPassword: ResetPasswordModel): Observable<ResetPasswordModel> {
    return this.postData(Urls.CHANGE_PASSWORD, resetPassword);
  }

  public resendOTP(resetPassword: ResetPasswordModel): Observable<ResetPasswordModel> {
    return this.postData(Urls.RESEND_OTP_PASSWORD, resetPassword);
  }


  public signupNewUser(userViewModel: UserViewModel): Observable<UserViewModel> {
    if (!userViewModel.encryptedAssociationId) {
      return this.postData(Urls.REGISTER_ASSOCIATION, userViewModel);
    }

    return this.postData(Urls.REGISTER_USER, userViewModel);
  }

  setAuthenticationToken(authenticatedUser: UserViewModel) {
    this.localStorageService.setAuthenticationToken(authenticatedUser);
    this.loggedInUser = this.localStorageService.getLoggedInUser();
    for (let i = 0; i < this.loginLogoutObservers.length; i++) {
      this.loginLogoutObservers[i].next("login");
    }
  }

  isLoggedIn(): boolean {
    return this.localStorageService.isLoggedIn();
  }

  
  logout() {
    this.localStorageService.logout();
    for (let i = 0; i < this.loginLogoutObservers.length; i++) {
      this.loginLogoutObservers[i].next("logout");
    }
  }

  getUser() {
    return this.loggedInUser;
  }

}
