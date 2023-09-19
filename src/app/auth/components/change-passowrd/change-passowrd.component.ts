import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResetPasswordModel } from 'app/models/reset-password-model';
import { Subject, takeUntil } from 'rxjs';

import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'sorax-change-passowrd',
  templateUrl: './change-passowrd.component.html',
  styleUrls: ['./change-passowrd.component.scss']
})
export class ChangePassowrdComponent extends BaseComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  private ngUnsubscribe$ = new Subject<void>();


  resetFormGroup: FormGroup;
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();

  constructor(private formBuilder: FormBuilder,
     private loginService: LoginService,
      private router:Router,
      private loader: AppLoaderService,
      private activatedRoute: ActivatedRoute,
     private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe((params) => {
      let pid = params["id"];
      this.resetPasswordModel.encryptedRefId = pid;
    });
    
    const password = new FormControl('', Validators.required);
    //const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
    const confirmPassword = new FormControl('', Validators.required);
    
    this.resetFormGroup = this.formBuilder.group({
      encryptedRefId: this.formBuilder.control(this.resetPasswordModel.encryptedRefId),
      otp: this.formBuilder.control('',[Validators.required,SoraxValidators.otpValidator]),
      password: password,
      confirmPassword: confirmPassword
    });
  }

  ngAfterViewInit() {
    // to clear loaders or indeterminate components in exceptional cases
    this.loader.setComponents([this.progressBar, this.submitButton]);
 }

  resetPasswordFormSubmitted() {
    this.progressBar.mode = 'indeterminate';
    this.submitButton.disabled =true;
    this.changePassword();
   
  }

  private changePassword() {

    let resetPasswordReqModel = this.resetFormGroup.value as ResetPasswordModel;
    resetPasswordReqModel.encryptedRefId = this.resetPasswordModel.encryptedRefId;

    this.loginService.changePassword(resetPasswordReqModel)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(
      (response) => {
        this.progressBar.mode = 'determinate';
        this.submitButton.disabled =false;

        Object.assign(this.resetPasswordModel, response['result']);
        //setting the messages 
        Object.assign(this.messages, response);
        if (this.messages.isSuccess()) {
          this.notificationService.showMessages(this.messages);
          this.router.navigate(['/auth/login']);
        }
      });
  }

  resendOTP() {
    this.progressBar.mode = 'indeterminate';
    this.submitButton.disabled =true;

    let resetPasswordReqModel = this.resetFormGroup.value as ResetPasswordModel;
    resetPasswordReqModel.encryptedId = this.resetPasswordModel.encryptedId;

    this.loginService.resendOTP(resetPasswordReqModel)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(
      (response) => {
        this.progressBar.mode = 'indeterminate';
        this.submitButton.disabled =true;
        Object.assign(this.resetPasswordModel, response['result']);
        //setting the messages 
        Object.assign(this.messages, response);
      });
  }

 
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();

    this.loader.close();
  }

}
