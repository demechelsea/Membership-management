import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/auth/service/login.service';
import { BaseService } from 'app/common/services/base.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResetPasswordModel } from 'app/models/reset-password-model';
import { UserViewModel } from 'app/models/user-view-model';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'sorax-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss'],
})
export class VerifyUserComponent extends BaseComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();

  verifyForm: FormGroup;
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();
  userViewModel: UserViewModel = new UserViewModel();
  userViewModelAsParam: UserViewModel = new UserViewModel();

  constructor( private formBuilder: FormBuilder
                        , private loginService:LoginService
                        , private router:Router
                        , private activatedRoute: ActivatedRoute) {
    super();
   }
  
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe((params) => {
      let pid = params["id"];
      this.resetPasswordModel.encryptedRefId = pid;
    });

    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.userViewModelAsParam = queryParams as UserViewModel;
    
    this.verifyForm = this.formBuilder.group({
        otp: this.formBuilder.control("", [Validators.required, SoraxValidators.otpValidator]) 
      
    });
  }


  verifyUser() {
    let resetPasswordReqModel = this.verifyForm.value as ResetPasswordModel;
    resetPasswordReqModel.encryptedId = this.userViewModelAsParam.encryptedId;
    resetPasswordReqModel.encryptedRefId= this.resetPasswordModel.encryptedRefId;

    this.loginService.verifyUser(resetPasswordReqModel)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(
      (response) => {
          Object.assign(this.resetPasswordModel, response['result']);
          //setting the messages 
          Object.assign(this.messages, response);
          
          Object.assign(this.userViewModel, response['result'].userDTO);
          //setting base messages
          BaseService.baseMessages=this.messages;

          if(this.userViewModel.authToken !=null){
            if(this.userViewModel.mappedAssociation?.length > 1){
              const userModelJson  = JSON.stringify(this.userViewModel);
              this.router.navigate(['/auth/selectMappedAssociation', this.userViewModel.encryptedId], 
                              {queryParams: {"data":userModelJson}});
            } else if (this.userViewModel.mappedAssociation?.length == 1) {
              this.userViewModel.association = this.userViewModel.mappedAssociation[0];
              this.loginService.setAuthenticationToken(this.userViewModel);
              BaseService.baseMessages = this.loginService.createSuccessMessage("Your login is successfull");
              this.router.navigate(['/dashboard']);
            }else{
              
            }
          }
      });
  }


  resendOTP() {
    let resetPasswordReqModel = this.verifyForm.value as ResetPasswordModel;
    resetPasswordReqModel.encryptedRefId= this.resetPasswordModel.encryptedRefId;

     this.loginService.resendOTP(resetPasswordReqModel)
     .pipe(takeUntil(this.ngUnsubscribe$))
     .subscribe(
      (response) => {
        Object.assign(this.resetPasswordModel, response);
        //setting the messages 
        Object.assign(this.messages, response);
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


}
