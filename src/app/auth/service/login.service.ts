import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import LableValueModel from 'app/models/lable-value-model';
import { ResetPasswordModel } from 'app/models/reset-password-model';
import { UserViewModel } from 'app/models/user-view-model';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpAppDataService {
  [x: string]: any;

  public loginLogoutObservable: Observable<string>;
  public loginLogoutObservers: Observer<string>[] = [];

  loggedInUser: UserViewModel = new UserViewModel();

  constructor(httpClient: HttpClient) {
    super(httpClient);

    this.loginLogoutObservable = Observable.create(
      (obsever: Observer<string>) => {
        this.loginLogoutObservers.push(obsever);
      });
  }


  public checkAuthentication(employeModel: UserViewModel): Observable<UserViewModel> {
    let keyValueModelMap = [];
    let userName: LableValueModel = new LableValueModel();
    userName.id = "X-Auth-Username";
    userName.name = employeModel.emailId;
    keyValueModelMap.push(userName);

    let password: LableValueModel = new LableValueModel();
    password.id = "X-Auth-Password";
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


  public signupNewUser(employeModel: UserViewModel): Observable<UserViewModel> {
    return this.postData(Urls.REGISTER_USER, employeModel);
  }

  setAuthenticationToken(authenticatedUser: UserViewModel) {

    let authenticatedUserJsonString = JSON.stringify(authenticatedUser);
    this.loggedInUser = JSON.parse(authenticatedUserJsonString);
    sessionStorage.smptAuthenticatedUser = authenticatedUserJsonString;

    for (let i = 0; i < this.loginLogoutObservers.length; i++) {
      this.loginLogoutObservers[i].next("login");
    }
  }

  isLoggedIn(): boolean {
    let authenticatedUserJsonString = sessionStorage.getItem("smptAuthenticatedUser");
    if (authenticatedUserJsonString != null) {
      this.loggedInUser = JSON.parse(authenticatedUserJsonString);
    }

    return (this.loggedInUser != null && this.loggedInUser.authToken != null);
  }


  logout() {
    sessionStorage.removeItem("smptAuthenticatedUser");
    this.loggedInUser = null;

    for (let i = 0; i < this.loginLogoutObservers.length; i++) {
      this.loginLogoutObservers[i].next("logout");
    }
  }

  getUser() {
    return this.loggedInUser;
  }

}
