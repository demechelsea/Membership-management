import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/auth/service/login.service';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import { NotificationService } from 'app/common/services/notification.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import { BaseComponent } from 'app/core/components/base/base.component';
import { AssociationModel } from 'app/models/association-model';
import { ResetPasswordModel } from 'app/models/reset-password-model';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent  extends BaseComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  contextAssociation: AssociationModel = new AssociationModel();
  
  private ngUnsubscribe$ = new Subject<void>();

  resetFormGroup: FormGroup;
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();

  constructor(private formBuilder: FormBuilder,
     private loginService: LoginService,
     private router: Router,
     private route: ActivatedRoute,
      private loader: AppLoaderService,
      private localStorageService: LocalstorageService,
      private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {

    this.resetFormGroup = this.formBuilder.group({
      userName: this.formBuilder.control('', [Validators.required, SoraxValidators.phoneEmail]),
    });
    this.contextAssociation = this.localStorageService.getContextAssociation();
  }

  ngAfterViewInit() {
    // to clear loaders or indeterminate components in exceptional cases
    this.loader.setComponents([this.progressBar, this.submitButton]);
 }
  resetPasswordFormSubmitted() {
    this.progressBar.mode = 'indeterminate';
    this.submitButton.disabled =true;
  
    let resetPasswordReqModel = this.resetFormGroup.value as ResetPasswordModel;

    this.loginService.sendOtpForResetPassword(resetPasswordReqModel)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(
      (response) => {
        Object.assign(this.resetPasswordModel, response['result']);
        this.progressBar.mode = 'determinate';
        this.submitButton.disabled =false;
        //setting the messages 
        Object.assign(this.messages, response);
        if (this.messages.isSuccess()) {
          this.notificationService.showMessages(this.messages);
         
          this.router.navigate(['/auth/changePassword', this.resetPasswordModel.encryptedRefId]);
        }
      });
   
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();

    this.loader.close();
  }

}