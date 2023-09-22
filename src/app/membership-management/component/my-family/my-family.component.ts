import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { SoraxColumnDefinition } from "app/common/components/sorax-table-view/sorax-column-definition";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject, takeUntil } from "rxjs";
import { MyfamilyPopupComponent } from "./my-family-popup/my-family-popup.component";
import { MyfamilyService } from "app/membership-management/services/my-family-service/my-family.service";
import { UserRelationShipDTO } from "app/models/UserRelationShipDTO";


@Component({
  selector: "app-my-family",
  templateUrl: "./my-family.component.html",
  styleUrls: ["./my-family.component.scss"],
  animations: SoraxAnimations,
})
export class MyFamilyComponent extends BaseComponent implements OnInit {
  public membershipPlanData: any;
  public membershipColumns: SoraxColumnDefinition[];

  @Input() memberDataId: number;

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  listFamilyMembers: UserRelationShipDTO[];

  constructor(
    private dialog: MatDialog,
    private familyMemberService: MyfamilyService,
    private loader: AppLoaderService,
    private notificationService: NotificationService

  ) {
    super();
  }

  ngOnInit() {
    this.initializeColumns();
    this.getPageResults(this.memberDataId);
  }

  openPopUp(data: UserRelationShipDTO, isNew?: boolean) {
    console.log("ddd", data.photoLink);
    
    let title = isNew ? "Add Family Member" : "Update Family Member";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      MyfamilyPopupComponent,
      {
        width: "800px",
        disableClose: true,
        data: { title: title, 
          payload: data, 
          isNew: isNew, 
          selectedUserDetailId: this.memberDataId ,
          photoLink: data.photoLink,
        },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      this.getPageResults(this.memberDataId);
    });
  }


  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getPageResults(id: number) {
    this.loader.open();
    this.familyMemberService
      .getFamilyMembers(id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        console.log(response);
        
        Object.assign(this.resultViewModel, response);
        this.listFamilyMembers = this.resultViewModel.result;
        this.membershipPlanData = this.listFamilyMembers.map(
          (familyMember) => {
            return {
              ...familyMember,
              name: `${familyMember.fromUserDetail.firstName} ${familyMember.fromUserDetail.parentName}`,
              primaryEmail: `${familyMember.fromUserDetail.primaryEmail}`,
            };
          }
        );
        Object.assign(this.messages, response);
        this.loader.close();
      });
  }

  deleteFamilyMember(row: any) {
    this.familyMemberService
      .deleteFamilyMember(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        if (response.success) {
          this.notificationService.showSuccess(response.messages[0].message);
          this.getPageResults(this.memberDataId);
        } else {
          this.notificationService.showError(response.messages[0].message);
        }
      });
  }

  executeRowActions(rowData: UserRelationShipDTO) {
    if (rowData.performAction == "Edit") {
      this.openPopUp(rowData, false);
    }
    else if (rowData.performAction == "Delete") {
      this.deleteFamilyMember(rowData);
    }
  }

  sortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getPageResults(this.memberDataId);
  }

  pageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getPageResults(this.memberDataId);
  }

  initializeColumns(): void {
    this.membershipColumns = [
      {
        name: "Name",
        dataKey: "name",
        position: "left",
        isSortable: true,
        link: true,
      },
      {
        name: "Relationship",
        dataKey: "relationshipType",
        position: "left",
        isSortable: true,
      },
      {
        name: "Email",
        dataKey: "primaryEmail",
        position: "left",
        isSortable: true,
      },
      {
        name: "Can I login?",
        dataKey: "canLoginToAssoc",
        position: "left",
        isSortable: true,
      },
      {
        name: "Actions",
        dataKey: "action",
        position: "left",
        isSortable: true,
      },
    ];
  }
}
