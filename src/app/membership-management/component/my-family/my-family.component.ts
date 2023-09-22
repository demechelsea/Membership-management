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
import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import MemershipPlanModel from "app/models/membershipPlanModel";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject, takeUntil } from "rxjs";
import { MyfamilyPopupComponent } from "./my-family-popup/my-family-popup.component";


@Component({
  selector: "app-my-family",
  templateUrl: "./my-family.component.html",
  styleUrls: ["./my-family.component.scss"],
  animations: SoraxAnimations,
})
export class MyFamilyComponent extends BaseComponent implements OnInit {
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
    //this.getPageResults();
  }

  openPopUp(data: AssociationMemberDTO, isNew?: boolean) {
    let title = isNew ? "Add Assocition Member" : "Update Assocition Member";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      MyfamilyPopupComponent,
      {
        width: "800px",
        disableClose: true,
        data: { title: title, payload: data, isNew: isNew, selectedAssociationMember: data.id },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      this.getPageResults();
    });
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
    this.membershipColumns = [
      {
        name: "Name",
        dataKey: "planName",
        position: "left",
        isSortable: true,
        link: true,
      },
      {
        name: "Relationship",
        dataKey: "description",
        position: "left",
        isSortable: true,
      },
      {
        name: "Email",
        dataKey: "fee",
        position: "left",
        isSortable: true,
      },
      {
        name: "Can I login?",
        dataKey: "interval",
        position: "left",
        isSortable: true,
      },
      {
        name: "Actions",
        dataKey: "modifiedser",
        position: "left",
        isSortable: true,
      },
    ];
  }
}
