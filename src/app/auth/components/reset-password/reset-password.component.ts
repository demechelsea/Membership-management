import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/auth/service/login.service';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResetPasswordModel } from 'app/models/reset-password-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent  extends BaseComponent implements OnInit {
  subscription: Subscription;

  resetFormGroup: FormGroup;
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();

  constructor(private formBuilder: FormBuilder,
     private loginService: LoginService,
     private router: Router,
     private route: ActivatedRoute,
      private loader: AppLoaderService,
     private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.resetFormGroup = this.formBuilder.group({
      userName: this.formBuilder.control('', [Validators.required, SoraxValidators.phoneEmail]),
    });
  }

  resetPasswordFormSubmitted() {
    this.loader.open();
  
    let resetPasswordReqModel = this.resetFormGroup.value as ResetPasswordModel;

    this.subscription = this.loginService.sendOtpForResetPassword(resetPasswordReqModel).subscribe(
      (response) => {
        Object.assign(this.resetPasswordModel, response);
        //setting the messages 
        Object.assign(this.messages, response);
        if (this.messages.isSuccess()) {
          this.notificationService.showMessages(this.messages);
         
          this.router.navigate(['/auth/changePassword', this.resetPasswordModel.encryptedId]);
        }
      });
   
  }


  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
    this.loader.close();
  }

}