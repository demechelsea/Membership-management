import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
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
import MemershipPlanModel from "app/models/membershipPlanModel";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject, takeUntil } from "rxjs";

import { MembershipPlanPopupComponent } from "./membership-popup/membership-plan-popup.component";

@Component({
  selector: "app-membership-plan",
  templateUrl: "./membership-plan.component.html",
  styleUrls: ["./membership-plan.component.scss"],
  animations: SoraxAnimations,
})
export class MembershipPlanComponent extends BaseComponent implements OnInit {
  public membershipPlanData: any;
  public membershipColumns: SoraxColumnDefinition[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  listPlans: MemershipPlanModel[];

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private membershipPlanService: MembershipPlanService,
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
    this.membershipPlanService
      .getItems(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        Object.assign(this.resultViewModel, response);
        this.listPlans = this.resultViewModel.result;
        this.membershipPlanData = this.listPlans;
        Object.assign(this.messages, response);
        this.loader.close();
      });
  }

  openPopUp(data: MemershipPlanModel, isNew?: boolean) {
    let title = isNew ? "Add Membership Plan" : "Update Membership Plan";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      MembershipPlanPopupComponent,
      {
        width: "720px",
        disableClose: true,
        data: { title: title, payload: data, isNew: isNew },
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
      this.openPopUp(rowData, false);
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
    this.membershipColumns = [
      {
        name: "Membership Plan name",
        dataKey: "planName",
        position: "left",
        isSortable: true,
        link: true,
        clickEvent: (data) => {
          this.openPopUp(data, false);
        },
      },
      {
        name: "Description",
        dataKey: "description",
        position: "left",
        isSortable: true,
      },
      {
        name: "Membership Fee",
        dataKey: "fee",
        position: "left",
        isSortable: true,
      },
      {
        name: "Renewal Interval",
        dataKey: "interval",
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
        name: "Active Subscriptions",
        dataKey: "activeSubscriptions",
        position: "left",
        isSortable: false,
      },
      {
        name: "Updated On",
        dataKey: "modifiedTimestamp",
        position: "left",
        isSortable: true,
        dataType: "Date",
      },
      {
        name: "Updated By",
        dataKey: "modifiedUser",
        position: "left",
        isSortable: true,
      },
    ];
  }
}
