import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResetPasswordModel } from 'app/models/reset-password-model';
import { Subscription } from 'rxjs';

import { LoginService } from '../../service/login.service';

@Component({
  selector: 'sorax-change-passowrd',
  templateUrl: './change-passowrd.component.html',
  styleUrls: ['./change-passowrd.component.scss']
})
export class ChangePassowrdComponent extends BaseComponent implements OnInit {
  subscription: Subscription;

  resetFormGroup: FormGroup;
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();

  constructor(private formBuilder: FormBuilder,
     private loginService: LoginService,
      private router:Router,
      private activatedRoute: ActivatedRoute,
      private loader: AppLoaderService,
     private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.params.subscribe((params) => {
      let pid = params["id"];
      this.resetPasswordModel.encryptedId = pid;
    });
    
    const password = new FormControl('', Validators.required);
    //const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
    const confirmPassword = new FormControl('', Validators.required);
    
    this.resetFormGroup = this.formBuilder.group({
      encryptedId: this.formBuilder.control(this.resetPasswordModel.encryptedId),
      otp: this.formBuilder.control('',[Validators.required,SoraxValidators.otpValidator]),
      password: password,
      confirmPassword: confirmPassword
    });
  }

  resetPasswordFormSubmitted() {
    this.loader.open();
    this.changePassword();
   
  }

  private changePassword() {

    let resetPasswordReqModel = this.resetFormGroup.value as ResetPasswordModel;
    resetPasswordReqModel.encryptedId = this.resetPasswordModel.encryptedId;

    this.subscription = this.loginService.changePassword(resetPasswordReqModel).subscribe(
      (response) => {
        Object.assign(this.resetPasswordModel, response);
        //setting the messages 
        Object.assign(this.messages, response);
        if (this.messages.isSuccess()) {
          this.notificationService.showMessages(this.messages);
          this.router.navigate(['/auth/login']);
        }
      });
  }

  resendOTP() {
    this.loader.open();
    let resetPasswordReqModel = this.resetFormGroup.value as ResetPasswordModel;
    resetPasswordReqModel.encryptedId = this.resetPasswordModel.encryptedId;

    this.subscription = this.loginService.resendOTP(resetPasswordReqModel).subscribe(
      (response) => {
        Object.assign(this.resetPasswordModel, response);
        //setting the messages 
        Object.assign(this.messages, response);
      });
  }

 
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
    this.loader.close();
  }

}
