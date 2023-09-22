import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociationService } from 'app/auth/service/association.service';
import { LoginService } from 'app/auth/service/login.service';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';
import { BaseService } from 'app/common/services/base.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { AssociationModel } from 'app/models/association-model';
import { RequestWrapperModel } from 'app/models/request-wrapper-model';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-association',
  templateUrl: './search-association.component.html',
  styleUrls: ['./search-association.component.scss'],
  animations: SoraxAnimations,
 
})
export class SearchAssociationComponent extends BaseComponent implements OnInit, OnDestroy {

  public searchAssociationForm: UntypedFormGroup;

  private ngUnsubscribe$ = new Subject<void>();
  public filteredAssociations:AssociationModel[] =[];
  public mappedAssociations:AssociationModel[] =[];

  public isAssociationMapped: boolean = false;

  constructor(private loginService: LoginService
          , private associationService: AssociationService
          , private router: Router
          , private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.buildSearchAssoicationForm();
    this.isAssociationMapped = this.loginService.isLoggedIn();
    this.retrieveAllAssoication();
    this.retrieveMappedAssociations();

  }

  buildSearchAssoicationForm() {
     this.searchAssociationForm = new UntypedFormGroup({
        searchText: new UntypedFormControl(''),
      });

    this.searchAssociationForm.get('searchText').valueChanges
      .pipe(debounceTime(300)) 
      .subscribe(() => {
        this.retrieveAllAssoication();
      });
  }

  selectAssociation(association: AssociationModel) {

    //login again from new model
    this.loginService.setLogInAssoication(association);
    let logginMessage = `Your login to ${association.name} is successfull.`;
    BaseService.baseMessages = this.loginService.createSuccessMessage(logginMessage);
    let returnUrl = this.activatedRoute.snapshot.queryParamMap.get("returnUrl");
    this.router.navigate([returnUrl || '/dashboard']);
  }

  registerAssociation(association: AssociationModel) {
      alert('Wait till membership details finished');
  }

  
  delinkAssocation(association: AssociationModel) {
    alert('TODO: Need to finsh');
}

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
  
  retrieveAllAssoication(): void {
    let requestWrapperModel:RequestWrapperModel = new RequestWrapperModel();
    requestWrapperModel.inputData = this.searchAssociationForm.get('searchText').value.toLowerCase();
    requestWrapperModel.page = this.page;
    // Filter associations based on the filter text
     this.associationService.retrieveAllAssociations(requestWrapperModel)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
              this.filteredAssociations=[];
              if (response.result != null) {
                Object.assign(this.page, response.page);
                Object.assign(this.filteredAssociations, response.result);
                this.markAssoicationMapped();
              }
            }); 
  }

  searchAssoicationPageEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.retrieveAllAssoication();
  }

  retrieveMappedAssociations() {
    this.associationService.retrieveMappedAssociations().pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe((response) => {
        Object.assign(this.mappedAssociations, response.result);
     });
   }

   markAssoicationMapped() {
    for (const allAssociationModel of this.filteredAssociations) {
      for (const linkedAssociation of this.mappedAssociations) {
          if (allAssociationModel.name === linkedAssociation.name 
                   && allAssociationModel.place === linkedAssociation.place) {
              allAssociationModel.linked = true;
          }
      }
    }
  }

}
