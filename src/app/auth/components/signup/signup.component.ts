import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { BaseComponent } from 'app/core/components/base/base.component';
import { UserViewModel } from 'app/models/user-view-model';
import { LoginService } from 'app/auth/service/login.service';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';

@Component({
  selector: 'sorax-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: SoraxAnimations,
})
export class SignupComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  private ngUnsubscribe$ = new Subject<void>();
  signUpForm: FormGroup;

  userViewModel: UserViewModel = new UserViewModel();

  constructor(private formBuilder: FormBuilder
    , private loginService: LoginService
    , private loader: AppLoaderService
    , private router: Router
    , private route: ActivatedRoute) {
    super();

  }

  ngOnInit() {
    const password = new FormControl('', Validators.required);
    //const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
    const confirmPassword = new FormControl('', Validators.required);

    this.signUpForm = this.formBuilder.group({
      user: this.formBuilder.group(
        {
          userDetail: this.formBuilder.group({
            firstName: this.formBuilder.control("", Validators.required),
            surName: this.formBuilder.control("", Validators.required)
          }),
          emailId: this.formBuilder.control("", [Validators.required, Validators.email]),
          phone: this.formBuilder.control("", Validators.required),
          password: password,
          confirmPassword: confirmPassword,

        }),
      agreed: this.formBuilder.control(false, Validators.requiredTrue)
    });


  }

  ngAfterViewInit() {
    // to clear loaders or indeterminate components in exceptional cases
    this.loader.setComponents([this.progressBar, this.submitButton]);
  }

  submitForRegistration() {
    this.progressBar.mode = 'indeterminate';
    this.submitButton.disabled = true;

    let userViewModelReqModel = this.signUpForm.value.user as UserViewModel;
    this.loginService.signupNewUser(userViewModelReqModel)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(
      (response) => {
        this.progressBar.mode = 'determinate';
        this.submitButton.disabled = false;
        Object.assign(this.userViewModel, response['result']);
        //saving the messages
        Object.assign(this.messages, response);

        if (this.messages.isSuccess()) {
          this.router.navigate(['/auth/verifyUser', this.userViewModel.encryptedRefId], { queryParams: this.userViewModel });
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
  


}
