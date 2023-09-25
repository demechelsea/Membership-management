import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injector, NgModule, ApplicationRef } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { LoginService } from 'app/auth/service/login.service';

@NgModule({
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }]
})
export class AppErrorHandler extends ErrorHandler {

  constructor(@Inject(Injector) private injector: Injector
              , private loginService:LoginService) {
    super();
  }

  private getNotificationService(): NotificationService {
    return this.injector.get(NotificationService);
  }

  handleError(error: any): void {
    let errorMessage = "Unexpected error has happened";
    if (error.status == 0) {
      errorMessage = "Application is unable to reach the server, please check your internet connection.";
    } else if (error.status == 404 || error.status == 504) {
      errorMessage = "Error happened while invoking the service from browser.";
    } else if (error.status == 400) {
      errorMessage = "Currently application is unable to process your request, please try again after sometime.";
    } else if (error.status == 500) {
      errorMessage = "Internal server error has happend, please try again after sometime.";
    } else {
      errorMessage = error.message;
    }

    if (error.error) {
      // if (error.error.message.includes("INVALID_AUTH_TOKEN")) {
      //   //handle logout here,
      //  // this.loginService.logout();
      // }
      errorMessage = errorMessage + " " + error.error.message;
    }

    this.getNotificationService().showError(errorMessage, "Error", { onActivateTick: true, positionClass: 'toast-top-full-width' });

    //TODO: Logging this error should be done for tracking purpose
    let appRef = this.injector.get(ApplicationRef);
    appRef.tick();
    // super.handleError(error);
  }

}