import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociationService } from 'app/auth/service/association.service';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { BaseService } from 'app/common/services/base.service';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import { BaseComponent } from 'app/core/components/base/base.component';
import { AssociationModel } from 'app/models/association-model';
import { UserViewModel } from 'app/models/user-view-model';
import { Subject, takeUntil } from 'rxjs';

import { LoginService } from '../../service/login.service';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';


@Component({
  selector: 'sorax-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: SoraxAnimations,

})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  contextAssociation: AssociationModel = new AssociationModel();
  loginForm: FormGroup;
  displayMessage: any;
  pageLoaded: boolean = false;

  private ngUnsubscribe$ = new Subject<void>();
  userModel: UserViewModel = new UserViewModel();

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private associationService: AssociationService,
    private localStorageService: LocalstorageService,
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

    this.initilizeLoginForm();

    this.initilizeAssociationContext();
  }

  private initilizeLoginForm() {
    const password = new FormControl('', [Validators.required]);

    this.loginForm = this.formBuilder.group({
      user: this.formBuilder.group(
        {
          emailId: this.formBuilder.control("",
            [Validators.required, SoraxValidators.phoneEmail]),
          password: password,
          agreed: [false, Validators.requiredTrue],
        }
      ),
    });
  }

  private initilizeAssociationContext() {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((params) => {
      let assocContextPath = params["assocContextPath"];
      this.associationService.setAssociationContextToLocalStorage(assocContextPath).then((data) => {
        this.contextAssociation = this.localStorageService.getContextAssociation();
        this.pageLoaded = true;
      });
    });
  }

  ngAfterViewInit() {
    // to clear loaders or indeterminate components in exceptional cases
    this.loader.setComponents([this.progressBar, this.submitButton]);
  }

  signInClicked() {
    this.progressBar.mode = 'indeterminate';
    this.submitButton.disabled = true;
    let userViewModel = this.loginForm.value.user as UserViewModel;

    this.loginService.checkAuthentication(userViewModel)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (response) => {
          //if user is not successfully logged in, it will write the relavant error messges to the model
          //and it gets displayed using Alert directive service i.e., soraxdir-alert-message
          Object.assign(this.userModel, response['result']);

          //setting the messages 
          Object.assign(this.messages, response);
          this.progressBar.mode = 'determinate';
          this.submitButton.disabled = false;
          this.userModel.authToken;
       
          if (this.userModel.authToken != null) {
            this.loginService.setAuthenticationToken(this.userModel);

            if (this.contextAssociation?.soceityRaxUrl) {
              this.handleContextBasedLogin();
            } else {
              if (this.userModel.mappedAssociation?.length > 1) {
                this.navigateToAssociationSelection();
              } else if (this.userModel.mappedAssociation?.length == 1){
                this.userModel.association = this.userModel.mappedAssociation[0];
                this.navigateToDashboard();
              }else {
                this.navigateToCreateAssociation();
              }
            }
          } else if (this.userModel.encryptedRefId != null) {
            //this.userModel.encryptedRefId
            this.router.navigate(['/auth/verifyUser', this.userModel.encryptedRefId], { queryParams: this.userModel });

          }
        });
  }

  private handleContextBasedLogin() {
    let associationModelMatched: AssociationModel;
    this.userModel.mappedAssociation.forEach((associationModel) => {
      if (associationModel.soceityRaxUrl == this.contextAssociation.soceityRaxUrl) {
        associationModelMatched = associationModel;
      }
    });
    if (associationModelMatched) {
      this.userModel.association = associationModelMatched;
      this.navigateToDashboard();
    } else {
      this.messages = this.loginService.createErrorMessage("Invalid login details");
    }
  }

  private navigateToAssociationSelection() {
    const userModelJson = JSON.stringify(this.userModel);
    this.loginService.setAuthenticationToken(this.userModel);
    this.router.navigate(['/manageAssociations/selectMappedAssociation']);
  }

  private navigateToDashboard() {
    this.loginService.setAuthenticationToken(this.userModel);
    BaseService.baseMessages = this.loginService.createSuccessMessage("Your login is successfull");
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    this.router.navigate([returnUrl || '/dashboard']);
  }

  private navigateToCreateAssociation() {
    let msg:string ="No registered associations found for your account. You can create a new one or join an existing one."
    BaseService.baseMessages = this.loginService.createSuccessMessage(msg);
    this.router.navigate(['/manageAssociations']);
  }

  

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.loader.close();

  }
}
