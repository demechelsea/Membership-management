import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/auth/service/login.service';
import { BaseService } from 'app/common/services/base.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { AssociationModel } from 'app/models/association-model';
import { UserViewModel } from 'app/models/user-view-model';
import { Subject, takeUntil } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-select-association',
  templateUrl: './select-association.component.html',
  styleUrls: ['./select-association.component.scss']
})
export class SelectAssociationComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;

  private ngUnsubscribe$ = new Subject<void>();
userViewModel: UserViewModel = new UserViewModel();

  constructor( private formBuilder: FormBuilder
              , private loginService:LoginService
              , private router:Router
              , private activatedRoute: ActivatedRoute ) {
        super();
      }

  ngOnInit(): void {
     this.activatedRoute.params
    .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((params) => {
        let pid = params["id"];
      });
    
    const userViewModelJson = this.activatedRoute.snapshot.queryParams["data"];
    this.userViewModel = JSON.parse(userViewModelJson);
  }

  selectAssociation(assoication: AssociationModel){
    this.progressBar.mode = 'indeterminate';
    this.userViewModel.association = assoication;
    this.loginService.setAuthenticationToken(this.userViewModel);
    BaseService.baseMessages = this.loginService.createSuccessMessage("Your login is successfull");
    let returnUrl = this.activatedRoute.snapshot.queryParamMap.get("returnUrl");
    this.router.navigate([returnUrl || '/dashboard']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
 
}
