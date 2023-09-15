import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { SoraxColumnDefinition } from "app/common/components/sorax-table-view/sorax-column-definition";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { BaseComponent } from "app/core/components/base/base.component";
import MemershipPlanModel from "app/models/membershipPlanModel";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject, takeUntil } from "rxjs";


import { EmailSettingDTO } from "app/models/emailSettingDTO";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import { AssociationMembersService } from "app/association-settings/services/association-members-service/association-members-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-membership-plan",
  templateUrl: "./membership-management.component.html",
  styleUrls: ["./membership-management.component.scss"],
  animations: SoraxAnimations,
})
export class MembershipManagementComponent
  extends BaseComponent
  implements OnInit
{
  public associationMemberData: any;
  public membershipColumns: SoraxColumnDefinition[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  listPlans: AssociationMemberDTO[];

  public SMTPForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private associationMemberService: AssociationMembersService,
    private loader: AppLoaderService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.initializeColumns();
    this.getPageResults();
    this.buildSMTPForm(new EmailSettingDTO());
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  buildSMTPForm(emailSettingdata: EmailSettingDTO) {
    this.SMTPForm = this.formBuilder.group({
      id: [emailSettingdata.id, Validators.required],
      smtpHost: [emailSettingdata.smtpHost, Validators.required],
      port: [emailSettingdata.port, Validators.required],
      replyToEmail: [emailSettingdata.replyToEmail, Validators.required],
      signiture: [emailSettingdata.signiture, Validators.required],
      emailId: [emailSettingdata.emailId, Validators.required],
      password: [emailSettingdata.password, Validators.required],
    });
  }

  getPageResults() {
    this.loader.open();
    this.associationMemberService
      .getAssociationMembers(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        console.log(response);
        Object.assign(this.resultViewModel, response);
        this.listPlans = this.resultViewModel.result;
        this.associationMemberData = this.listPlans.map(
          (associationMember) => {
            return {
              ...associationMember,
              email: `${associationMember?.userDetail?.primaryEmail}`,
              title: `${associationMember.userDetail.title}`,
              membershipPlan: `${associationMember.membershipPlan.planName}`,
              membershipPlanId: `${associationMember.membershipPlanId}`,
            };
          }
        );
        Object.assign(this.messages, response);
        this.loader.close();
      });
  }

  openPopUp(data: AssociationMemberDTO, isNew?: boolean) {
    this.router.navigate(['./membershipManagement/profileHighlight']);
  }

  executeRowActions(rowData: MemershipPlanModel) {
    // if (rowData.performAction == "edit") {
    //   this.openPopUp(rowData, false);
    // } else {
    //   console.log("Delete action performed");
    // }
  }

  sortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getPageResults();
  }

  pageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getPageResults();
  }

  initializeColumns(): void {
    this.membershipColumns = [
      {
        name: "Name",
        dataKey: "title",
        position: "left",
        isSortable: true,
        link: true,
        clickEvent: (data) => {
          this.openPopUp(data, false);
        },
      },
      {
        name: "Membership plan",
        dataKey: "membershipPlan",
        position: "left",
        isSortable: true,
      },
      {
        name: "Membership Id",
        dataKey: "membershipPlanId",
        position: "left",
        isSortable: true,
      },
      {
        name: "Email",
        dataKey: "email",
        position: "left",
        isSortable: true,
      },
      {
        name: "Status",
        dataKey: "status",
        position: "left",
        isSortable: true,
      },
      {
        name: "Channel",
        dataKey: "activeSubscriptions",
        position: "left",
        isSortable: false,
      },
      {
        name: "Expire Date",
        dataKey: "modifiedTimestamp",
        position: "left",
        isSortable: true,
        dataType: "Date",
      },
      {
        name: "Member for",
        dataKey: "modifiedUser",
        position: "left",
        isSortable: true,
      },
    ];
  }
}
