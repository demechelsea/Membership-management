import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociationService } from 'app/auth/service/association.service';
import { LoginService } from 'app/auth/service/login.service';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';
import { BaseService } from 'app/common/services/base.service';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { AssociationModel } from 'app/models/association-model';
import { UserViewModel } from 'app/models/user-view-model';
import { Subject, takeUntil } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-select-association',
  templateUrl: './select-association.component.html',
  styleUrls: ['./select-association.component.scss'],
  animations: SoraxAnimations,
})
export class SelectAssociationComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;

  private ngUnsubscribe$ = new Subject<void>();
  public mappedAssociations: AssociationModel[] =[];
  public isAssociationMapped: boolean = false;

  constructor(private loginService: LoginService
          , private associationService: AssociationService
          , private router: Router
          , private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.isAssociationMapped = this.loginService.isLoggedIn();
    this.retrieveMappedAssociations();
  }

  selectAssociation(association: AssociationModel) {
    this.progressBar.mode = 'indeterminate';
    
    //login again from new model
    this.loginService.setLogInAssoication(association);
    let logginMessage = `Your login to ${association.name} is successfull.`;
    BaseService.baseMessages = this.loginService.createSuccessMessage(logginMessage);
    let returnUrl = this.activatedRoute.snapshot.queryParamMap.get("returnUrl");
    this.router.navigate([returnUrl || '/dashboard']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  retrieveMappedAssociations() {
      this.associationService.retrieveMappedAssociations().pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        Object.assign(this.mappedAssociations, response.result);
       });
  }

}
