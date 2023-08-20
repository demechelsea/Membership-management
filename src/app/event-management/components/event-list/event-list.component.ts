import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';
import { SoraxColumnDefinition } from 'app/common/components/sorax-table-view/sorax-column-definition';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResultViewModel } from 'app/models/result-view-model';
import WebsiteInfoModel from 'app/models/website-info-model';
import { WebsiteService } from 'app/website-builder/services/website.service';
import { Subject, takeUntil } from 'rxjs';
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {ThemePalette} from "@angular/material/core";
import committeeDTO from "../../../models/committeeDTO";
import {CommitteePositionDTO} from "../../../models/committeePositionDTO";
import {CommitteeService} from "../../../association-settings/services/committee-service/committee.service";
import {AppConfirmService} from "../../../common/services/app-confirm.service";
import {PositionService} from "../../../association-settings/services/position-service/position.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {
  CommitteePopupComponent
} from "../../../association-settings/components/committee/committee-popup/committee-popup.component";
import {
  PositionPopupComponent
} from "../../../association-settings/components/committee/position-popup/position-popup.component";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {
  openEventManagementPopupService
} from "../../services/openEventManagementPopup-service/openEventManagementPopup.service";
import {EventService} from "../../services/event-service/event.service";
import EventDTO from "../../../models/event/eventDTO";
import {EventPopupComponent} from "../event-popup/event-popup.component";
import * as moment from "moment";

@Component({
  selector: 'sorax-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  animations: SoraxAnimations,
})
export class EventListComponent extends BaseComponent implements OnInit {

  returnToCommitteeMemberPopup = false;
  @Output() openCommitteeMemberPopup: EventEmitter<void> =
      new EventEmitter<void>();

  @ViewChild("tabGroup") tabGroup: MatTabGroup;

  links = ["Active Events", "Past Events", "Coupons"];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  public committeePlanData: any;
  public committeeColumns: SoraxColumnDefinition[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  eventList: EventDTO[];
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
      private eventService: EventService,
      private loader: AppLoaderService,
      private confirmService: AppConfirmService,
      private positionService: PositionService,
      private openEventManagementPopupService: openEventManagementPopupService
  ) {
    super();
  }

  ngOnInit(): void {
    // this.initializeColumns();
    // this.getPageResults();
    this.getActiveEvents();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  viewCommittee(row: any) {
    this.selectedRow = row;
    this.showDetails = true;
  }

  editCommittee(row: any) {
    this.openCommitteePopUp(row, false);
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

  getActiveEvents(){
    this.loader.open();
    this.eventService
        .getActiveEvents()
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          Object.assign(this.resultViewModel, response);
          console.log(this.resultViewModel);
          this.eventList = this.resultViewModel.result;
          this.eventList.forEach(e => {
              e.startTimeLabel = moment(e.startDate).format("MMMM Do YYYY, h:mm:ss a")
              e.endTimeLabel = moment(e.endDate).format("MMMM Do YYYY, h:mm:ss a")
          })


          this.loader.close();
        })
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
    // if (event.index === 1) {
    //   this.positionService
    //       .getCommitteePositions()
    //       .pipe(takeUntil(this.ngUnsubscribe$))
    //       .subscribe((response) => {
    //         this.positions = response.result;
    //         this.positions.sort((a, b) => a.positionRank - b.positionRank);
    //       });
    // }
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
      this.getActiveEvents();
    });
  }

  openEventPopUp(data: EventDTO, isNew?: boolean) {
    let title = isNew ? "New Event" : "Edit Event";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
        EventPopupComponent,
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
        data.name = res.name;
        // data.positionRank = res.positionRank;
      } else {
        console.log("creating res", res);
        this.eventList.push(res);
      }

      // this.eventList.sort((a, b) => a.startDate - b.startDate);
      // this.getCommitteePosition();
      //
      // if (this.returnToCommitteeMemberPopup) {
      //   this.returnToCommitteeMemberPopup = false;
      //   this.tabGroup.selectedIndex = 0;
      //   this.openEventManagementPopupService.openEventManagementPopup();
      // }
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
        this.openEventManagementPopupService.openEventManagementPopup();
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
    this.getActiveEvents();
  }

  pageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getActiveEvents();
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
