import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { SoraxColumnDefinition } from "app/common/components/sorax-table-view/sorax-column-definition";
import { AppConfirmService } from "app/common/services/app-confirm.service";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { ResultViewModel } from "app/models/result-view-model";
import { Observable, Subject, Subscription, from, takeUntil } from "rxjs";

import { CommitteePopupComponent } from "./committee-popup/committee-popup.component";
import { CommitteeService } from "app/association-settings/services/committee-service/committee.service";
import committeeDTO from "app/models/committeeDTO";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { CommitteePositionDTO } from "app/models/committeePositionDTO";
import { PositionPopupComponent } from "./position-popup/position-popup.component";
import { PositionService } from "app/association-settings/services/position-service/position.service";
import { MatTabChangeEvent } from "@angular/material/tabs";

import { ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { opencommitteeMemberPopupService } from "app/association-settings/services/opencommitteeMemberPopup-service/opencommitteeMemberPopup.service";
import CommitteeDTO from "app/models/committeeDTO";

@Component({
  selector: "app-committee",
  templateUrl: "./committee.component.html",
  styleUrls: ["./committee.component.scss"],
  animations: SoraxAnimations,
})
export class CommitteeComponent extends BaseComponent implements OnInit {
  returnToCommitteeMemberPopup = false;
  @Output() openCommitteeMemberPopup: EventEmitter<void> =
    new EventEmitter<void>();

  @ViewChild("tabGroup") tabGroup: MatTabGroup;

  links = ["Committee summary", "Committee positions"];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  public committeePlanData: any;
  public committeeColumns: SoraxColumnDefinition[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  listPlans: committeeDTO[];
  positions: CommitteePositionDTO[];

  showDetails: boolean = false;
  selectedRow: any;
  showCommitteeTable: boolean = true;
  rowAction: EventEmitter<any> = new EventEmitter<any>();

  toggleBackground() {
    this.background = this.background ? undefined : "primary";
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private committeeService: CommitteeService,
    private loader: AppLoaderService,
    private positionService: PositionService,
    private opencommitteeMemberPopupService: opencommitteeMemberPopupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getPageResults();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  executeRowActions(row: CommitteeDTO) {
    if (row.performAction == "View") {
      this.selectedRow = row;
      this.showDetails = true;
    } 
    else if(row.performAction == "Edit") {
      this.openCommitteePopUp(row, false);
    }
  }

  onAddPosition() {
    this.tabGroup.selectedIndex = 1;
    this.returnToCommitteeMemberPopup = true;

    let positionModel = new CommitteePositionDTO();
    this.openPositionPopUp(positionModel, true);
  }

  onViewCommittees() {
    this.showDetails = false;
  }

  getPageResults() {
    this.loader.open();
    this.committeeService
      .getItems()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        if(response.result !== null){
        Object.assign(this.resultViewModel, response);
        this.listPlans = this.resultViewModel.result;
        this.committeePlanData = this.listPlans.map((committee) => {
          const start = new Date(committee.startDate);
          const end = new Date(committee.endDate);
          const durationInMonths = this.calculateDurationInMonths(start, end);
          return { ...committee, duration: `${durationInMonths} months` };
        });
        Object.assign(this.messages, response);
      }
        this.loader.close();
      
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.positions, event.previousIndex, event.currentIndex);
    const draggedPosition = this.positions[event.currentIndex];
    draggedPosition.positionRank = event.currentIndex + 1;
    this.positionService
      .updatePosition(draggedPosition.id, draggedPosition)
      .subscribe((response) => {
        if (response.success) {
          this.notificationService.showSuccess(response.messages[0].message);
        } else {
          this.notificationService.showError(response.messages[0].message);
        }
        this.getCommitteePosition();
      });
  }

  delete(position: any) {
    this.positionService
      .deletePosition(position)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        if (response.success) {
          this.notificationService.showSuccess(response.messages[0].message);
        } else {
          this.notificationService.showError(response.messages[0].message);
        }
        this.getCommitteePosition();
      });
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.positionService
        .getCommitteePositions()
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          this.positions = response.result;
          this.positions.sort((a, b) => a.positionRank - b.positionRank);
        });
    }
  }

  calculateDurationInMonths(start: Date, end: Date): number {
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    return years * 12 + months;
  }

  openCommitteePopUp(data: committeeDTO, isNew?: boolean) {
    let title = isNew ? "Create a New Committee" : "Edit Committee";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      CommitteePopupComponent,
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

  openPositionPopUp(data: CommitteePositionDTO, isNew?: boolean) {
    let title = isNew ? "Create a New Position" : "Edit Position";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      PositionPopupComponent,
      {
        width: "720px",
        disableClose: true,
        data: { title: title, payload: data, isNew: isNew },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        console.log("no res", res);
        return;
      }

      if (!isNew) {
        console.log("editing res", res);
        data.positionName = res.name;
        data.positionRank = res.positionRank;
      } else {
        console.log("creating res", res);
        this.positions.push(res);
      }

      this.positions.sort((a, b) => a.positionRank - b.positionRank);
      this.getCommitteePosition();

      if (this.returnToCommitteeMemberPopup) {
        this.returnToCommitteeMemberPopup = false;
        this.tabGroup.selectedIndex = 0;
        this.opencommitteeMemberPopupService.openCommitteeMemberPopup();
      }
    });
  }

  getCommitteePosition() {
    this.positionService
      .getCommitteePositions()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        this.positions = response.result;
        this.positions.sort((a, b) => a.positionRank - b.positionRank);
      });
  }

  committeeExecuteRowActions(rowData: committeeDTO) {
    if (rowData.performAction == "edit") {
      this.openCommitteePopUp(rowData, false);
    } else {
      console.log("Action performed");
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
    this.committeeColumns = [
      {
        name: "Start Date",
        dataKey: "startDate",
        position: "left",
        isSortable: true,
        dataType: "Date",
      },
      {
        name: "End date",
        dataKey: "endDate",
        position: "left",
        isSortable: true,
        dataType: "Date",
      },
      {
        name: "Duration",
        dataKey: "duration",
        position: "left",
        isSortable: true,
      },
      {
        name: "Committee lead by",
        dataKey: "leaderName",
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
      {
        name: "Action",
        dataKey: "action",
        position: "left",
        isSortable: true,
      },
    ];
  }
}
