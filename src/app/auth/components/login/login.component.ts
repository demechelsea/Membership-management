import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { BaseService } from 'app/common/services/base.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import { BaseComponent } from 'app/core/components/base/base.component';
import { UserViewModel } from 'app/models/user-view-model';
import { Subscription } from 'rxjs';

import { LoginService } from '../../service/login.service';


@Component({
  selector: 'sorax-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  displayMessage: any;

  subscription: Subscription;
  userModel: UserViewModel = new UserViewModel();

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private loader: AppLoaderService,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    //if user is already logged in, navigate the user back to home page
    if (this.loginService != null && this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    const password = new FormControl('test12345',[Validators.required]);

    this.loginForm = this.formBuilder.group({
      user: this.formBuilder.group(
        {
          emailId: this.formBuilder.control("tek.naresh@gmail.com",
                          [Validators.required, SoraxValidators.phoneEmail]),
          password: password,
          agreed: [true, Validators.requiredTrue],
        },
      ),
    });

  }

 
  signInClicked() {
    this.loader.open('Signin in...');
    let userViewModel = this.loginForm.value.user as UserViewModel;
    //  if (!this.loginForm.invalid) {
    //   // do what you wnat with your data
    //   console.log(this.loginForm.value);
    // }
    this.subscription = this.loginService.checkAuthentication(userViewModel).subscribe(
      (response) => {
        //if user is not successfully logged in, it will write the relavant error messges to the model
        //and it gets displayed using Alert directive service i.e., soraxdir-alert-message
        Object.assign(this.userModel, response);

        //setting the messages 
        Object.assign(this.messages, response);
        this.loader.close();
        if (this.userModel.authToken != null) {
          this.loginService.setAuthenticationToken(this.userModel);
          BaseService.baseMessages = this.loginService.createSuccessMessage("Your login is successfull");;

          let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
          this.router.navigate([returnUrl || '/dashboard']);

        } else if (this.userModel.encryptedRefId != null) {
          //this.userModel.encryptedRefId
          this.router.navigate(['/verifyUser', this.userModel.encryptedRefId]);

        }
      });
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }

    this.loader.close();

  }
}
