import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { BaseService } from 'app/common/services/base.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import { BaseComponent } from 'app/core/components/base/base.component';
import { UserViewModel } from 'app/models/user-view-model';
import { Subscription } from 'rxjs';

import { LoginService } from '../../service/login.service';
import { AssociationService } from 'app/auth/service/association.service';


@Component({
  selector: 'sorax-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;


  loginForm: FormGroup;
  displayMessage: any;

  subscription: Subscription;
  userModel: UserViewModel = new UserViewModel();

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private associationService : AssociationService,
    private router: Router,
    private loader: AppLoaderService,
    private route: ActivatedRoute) {
    super();
   
  }

  ngOnInit(): void {
    
    this.subscription = this.route.params.subscribe((params) => {
      let assocContextPath = params["assocContextPath"];
      this.associationService.retrieveAndStoreAssociationContext(assocContextPath);
    });

    //if user is already logged in, navigate the user back to home page
    if (this.loginService != null && this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    const password = new FormControl('',[Validators.required]);

    this.loginForm = this.formBuilder.group({
      user: this.formBuilder.group(
        {
          emailId: this.formBuilder.control("",
                          [Validators.required, SoraxValidators.phoneEmail]),
          password: password,
          agreed: [false, Validators.requiredTrue],
        },
      ),
    });

  }

  ngAfterViewInit() {
     // to clear loaders or indeterminate components in exceptional cases
     this.loader.setComponents([this.progressBar, this.submitButton]);
  }

 
  signInClicked() {
    this.progressBar.mode = 'indeterminate';
    this.submitButton.disabled =true;
    let userViewModel = this.loginForm.value.user as UserViewModel;
    //  if (!this.loginForm.invalid) {
    //   // do what you wnat with your data
    //   console.log(this.loginForm.value);
    // }
    this.subscription = this.loginService.checkAuthentication(userViewModel).subscribe(
      (response) => {
        //if user is not successfully logged in, it will write the relavant error messges to the model
        //and it gets displayed using Alert directive service i.e., soraxdir-alert-message
        Object.assign(this.userModel, response['result']);

        //setting the messages 
        Object.assign(this.messages, response);
        this.progressBar.mode = 'determinate';
        this.submitButton.disabled =false;
        if (this.userModel.authToken != null) {
          if(this.userModel.mappedAssociation?.length > 1){
            const userModelJson  = JSON.stringify(this.userModel);
            this.router.navigate(['/auth/selectMappedAssociation', this.userModel.encryptedId], 
                            {queryParams: {"data":userModelJson}});

          } else {
            this.userModel.association = this.userModel.mappedAssociation[0];
            this.loginService.setAuthenticationToken(this.userModel);
            BaseService.baseMessages = this.loginService.createSuccessMessage("Your login is successfull");
            
            let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
            this.router.navigate([returnUrl || '/dashboard']);
          }
        } else if (this.userModel.encryptedRefId != null) {
          //this.userModel.encryptedRefId
          this.router.navigate(['/auth/verifyUser', this.userModel.encryptedRefId], {queryParams: this.userModel});

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
