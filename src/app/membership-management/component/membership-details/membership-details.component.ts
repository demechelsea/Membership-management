import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MembershipPlanService } from "app/association-settings/services/membership-plan-service/membership-plan.service";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { SoraxColumnDefinition } from "app/common/components/sorax-table-view/sorax-column-definition";
import { AppConfirmService } from "app/common/services/app-confirm.service";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import MemershipPlanModel from "app/models/membershipPlanModel";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject, takeUntil } from "rxjs";
import { MembershipDetailsPopupComponent } from "./membership-details-popup/membership-details-popup.component";
import { AssocationMemberService } from "app/association-settings/services/assocation-member-service/assocation-member.service";
import { UserDetailDTO } from "app/models/UserDetailDTO";


@Component({
  selector: "app-membership-details",
  templateUrl: "./membership-details.component.html",
  styleUrls: ["./membership-details.component.scss"],
  animations: SoraxAnimations,
})
export class MembershipDetailsComponent extends BaseComponent implements OnInit {
  public subscriptionData: any;
  public membershipDetailsColumns: SoraxColumnDefinition[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  listSubscribtions: AssociationMemberDTO[];

  @Input() memberData: any;


  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private membershipDetailsService: AssocationMemberService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService
  ) {
    super();
  }

  ngOnInit() {
    this.initializeColumns();
    this.getPageResults();
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getPageResults() {
    this.loader.open();
    let userDetail = new UserDetailDTO();
    userDetail.id = this.memberData.userDetail.id;
    this.membershipDetailsService
      .getSubscribers(userDetail)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        Object.assign(this.resultViewModel, response);
        this.listSubscribtions = this.resultViewModel.result;
        this.subscriptionData = this.listSubscribtions.map(
          (associationMember) => {
            return {
              ...associationMember,
              membershipPlan: `${associationMember.membershipPlan.planName}`,
              fee: `${associationMember.membershipPlan.fee}`,
              status: `${associationMember.status}`,
            };
          }
        );
        Object.assign(this.messages, response);
      });
      this.loader.close();
  }

  openPopUp(data: AssociationMemberDTO, isNew?: boolean) {
    let title = "Subscribe to New Membership";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      MembershipDetailsPopupComponent,
      {
        width: "800px",
        disableClose: true,
        data: { title: title, payload: data, isNew: isNew, selectedUserDetail: this.memberData},
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      this.getPageResults();
    });
  }


  executeRowActions(rowData: MemershipPlanModel) {
    if (rowData.performAction == "edit") {
    } else {
      console.log("Delete action performed");
    }
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
    this.membershipDetailsColumns = [
      {
        name: "Membership Plan",
        dataKey: "membershipPlan",
        position: "left",
        isSortable: true,
        link: true,
      },
      {
        name: "Status",
        dataKey: "status",
        position: "left",
        isSortable: true,
      },
      {
        name: "Channel",
        dataKey: "fee",
        position: "left",
        isSortable: true,
      },
      {
        name: "Expiry date",
        dataKey: "interval",
        position: "left",
        isSortable: true,
      },
      {
        name: "Member for",
        dataKey: "description",
        position: "left",
        isSortable: true,
      },
      {
        name: "Actions",
        dataKey: "actions",
        position: "left",
        isSortable: true,
      },
    ];
  }
}
