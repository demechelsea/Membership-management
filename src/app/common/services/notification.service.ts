import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageViewModel } from 'app/models/messageViewModel';
import { MessageWrapModel } from 'app/models/messageWrapModel';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  defaultOptions: any = {
    tapToDismiss: false,
    closeButton: true,
    timeOut: 5000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  };

  constructor(private toastr: ToastrService,
    private snack: MatSnackBar,
    private loader: AppLoaderService) { }

  changePostion(options: object) {
    Object.assign(options, this.defaultOptions);
    this.defaultOptions = options;
  }

  showMessages(messages: MessageWrapModel) {

    if (messages != null && messages.messages.length > 0) {
      for (let i = 0; i < messages.messages.length; i++) {
        let messageViewModel = messages.messages[i];
        this.showMessage(messageViewModel);
      }
    }
  }

  showMessage(messageViewModel: MessageViewModel) {

    if (messageViewModel.type == 'VALIDATION_ERROR'
      || messageViewModel.type == 'BUSINESS_ERROR') {

      this.showError(messageViewModel.message);

    } else if (messageViewModel.type == 'INFO') {

      this.showInfo(messageViewModel.message);

    } else if (messageViewModel.type == 'WARNING') {

      this.showWarning(messageViewModel.message);

    } else if (messageViewModel.type == 'SUCCESS') {

      this.showSuccess(messageViewModel.message);

    }
  }

  showSuccess(message: string, title?, options?: object) {
    this.closeloader();

    let resultOption = {};
    Object.assign(resultOption, this.defaultOptions);
    //Object.assign(resultOption, options);
    this.toastr.success(message, title, resultOption);
  }

  showError(message: string, title?: string, options?: object) {
    this.closeloader();

    let resultOption = {};

    Object.assign(resultOption, this.defaultOptions);
    Object.assign(resultOption, options);
    this.toastr.error(message, title, resultOption);
  }

  showInfo(message: string, title?: string, options?: object) {
    this.closeloader();

    let resultOption = {};

    Object.assign(resultOption, this.defaultOptions);
    Object.assign(resultOption, options);
    this.toastr.info(message, title, resultOption);
  }

  showWarning(message: string, title?: string, options?: object) {

    this.closeloader();

    let resultOption = {};

    Object.assign(resultOption, this.defaultOptions);
    Object.assign(resultOption, options);
    this.toastr.warning(message, title, resultOption);
  }

  closeloader() {
    this.loader.close();
  }

}
