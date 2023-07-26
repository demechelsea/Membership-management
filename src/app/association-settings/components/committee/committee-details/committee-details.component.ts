import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { CommitteeMemberService } from "app/association-settings/services/committee-member-service/committee-member.service";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { SoraxColumnDefinition } from "app/common/components/sorax-table-view/sorax-column-definition";
import { AppConfirmService } from "app/common/services/app-confirm.service";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject, takeUntil } from "rxjs";
import { CommitteeMemberPopupComponent } from "./committee-member-popup/committee-member-popup.component";
import { AttachmentPopupComponent } from "./attachment-popup/attachment-popup.component";
import { CommitteeMemberDTO } from "app/models/committeeMemberDTO";
import { AttachmentService } from "app/association-settings/services/attachment-service/attachment.service";
import { CommitteeDocstoreDTO } from "app/models/committeeDocstoreDTO";
import * as moment from "moment";
import { opencommitteeMemberPopupService } from "app/association-settings/services/opencommitteeMemberPopup-service/opencommitteeMemberPopup.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { HttpClient } from "@angular/common/http";
import { FileDTO } from "app/models/FileDTO";

@Component({
  selector: "committee-member-details",
  templateUrl: "./committee-details.component.html",
  styleUrls: ["./committee-details.component.scss"],
  animations: SoraxAnimations,
})
export class DetailsComponent extends BaseComponent implements OnInit {
  @Input() selectedRow: any;
  @Output() addPosition: EventEmitter<void> = new EventEmitter<void>();

  public committeeMembersData: any;
  public attachmentData: any;
  public committeeMembersColumns: SoraxColumnDefinition[];
  public attachmentColumns: SoraxColumnDefinition[];

  @Output() viewCommittee: EventEmitter<void> = new EventEmitter<void>();

  public listAttachments: CommitteeDocstoreDTO[];
  public listCommitteeMembers: CommitteeMemberDTO[];

  private ngUnsubscribe$ = new Subject<void>();

  committeMemberResultViewModel: ResultViewModel = new ResultViewModel();
  attachmentResultViewModel: ResultViewModel = new ResultViewModel();

  rowAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private committeeService: CommitteeMemberService,
    private attachmentService: AttachmentService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private http: HttpClient,
    private opencommitteeMemberPopupService: opencommitteeMemberPopupService
  ) {
    super();
  }
  ngOnInit(): void {
    this.getCommitteeMembersData();
    this.initializeColumns();
    let committeeModel = new CommitteeMemberDTO();
    this.opencommitteeMemberPopupService.openCommitteeMemberPopup$.subscribe(
      () => {
        this.openCommitteeMemberPopUp(committeeModel, true);
      }
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.getCommitteeMembersData();
    } else if (event.index === 1) {
      this.getAttachmentData();
    }
  }

  getCommitteeMembersData() {
    this.committeeService
      .getCommitteeMembers(this.page, this.selectedRow.id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        console.log(response.result);
        Object.assign(this.committeMemberResultViewModel, response);
        Object.assign(this.page, this.committeMemberResultViewModel.page);
        this.listCommitteeMembers = this.committeMemberResultViewModel.result;
        this.committeeMembersData = this.listCommitteeMembers.map(
          (committeeMember) => {
            const start = new Date(committeeMember.startDate);
            const end = new Date(committeeMember.endDate);
            const durationInMonths = this.calculateDurationInMonths(start, end);
            return {
              ...committeeMember,
              fullName: `${committeeMember.associationMember.userDetail.firstName} ${committeeMember.associationMember.userDetail.givenName}  ${committeeMember.associationMember.userDetail.parentName}`,
              position: `${committeeMember.committeePosition.positionName}`,
              duration: `${durationInMonths} months`,
            };
          }
        );
      });
  }

  viewCommittees() {
    this.viewCommittee.emit();
  }

  getAttachmentData() {
    this.attachmentService
      .getAttachments(this.page, this.selectedRow.id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        Object.assign(this.attachmentResultViewModel, response);
        Object.assign(this.page, this.attachmentResultViewModel.page);
        this.listAttachments = this.attachmentResultViewModel.result;
        this.attachmentData = this.listAttachments.map((attachment) => ({
          ...attachment,
          attachmentDate: `${moment(attachment.modifiedTimestamp).format(
            "YYYY-MM-DD"
          )}`,
        }));
      });
  }

  calculateDurationInMonths(start: Date, end: Date): number {
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    return years * 12 + months;
  }

  editCommitteeMember(row: any) {
    this.openCommitteeMemberPopUp(row, false);
  }

  openCommitteeMemberPopUp(data?: CommitteeMemberDTO, isNew?: boolean) {
    let title = isNew
      ? "Create a new committee member"
      : "Edit committee member";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      CommitteeMemberPopupComponent,
      {
        width: "720px",
        disableClose: true,
        data: {
          title: title,
          payload: data,
          isNew: isNew,
          selectedCommittee: this.selectedRow,
          associationMemberId: data?.associationMember?.id,
          positionId: data?.committeePosition?.id,
          selectedCommitteeMember: data.id,
          photoLink: data.photoLink
        },
      }
    );
    dialogRef.componentInstance.addPosition.subscribe(() => {
      this.addPosition.emit();
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      this.getCommitteeMembersData();
    });
  }

  openAttachementPopUp(data: CommitteeMemberDTO, isNew?: boolean) {
    let title = isNew ? "Add New Attachment" : "Edit Attachment";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      AttachmentPopupComponent,
      {
        width: "920px",
        disableClose: true,
        data: {
          title: title,
          payload: data,
          isNew: isNew,
          id: this.selectedRow.id,
        },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        console.log("no res", res);
        return;
      }
      this.getAttachmentData();
    });
  }

  deleteAttachments(row: any) {
    this.attachmentService
      .deleteAttachment(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        if (response.success) {
          this.notificationService.showSuccess(response.messages[0].message);
          this.getAttachmentData();
        } else {
          this.notificationService.showError(response.messages[0].message);
        }
      });
  }

  committeeExecuteRowActions(rowData: CommitteeMemberDTO) {
    if (rowData.performAction == "edit") {
      this.openCommitteeMemberPopUp(rowData, false);
    } else {
      console.log("Delete action performed");
    }
  }

  handleViewAttachment(row: any) {

    let fileDTO= new FileDTO();
    fileDTO.docLink = row.docLink;
    this.attachmentService.downloadImage(fileDTO).subscribe((response: any) => {
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `${row.docName}`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  committeeSortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getCommitteeMembersData();
  }

  attachmentSortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getAttachmentData();
  }

  committeeMemeberPageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getCommitteeMembersData();
  }

  attachmentPageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getAttachmentData();
  }

  initializeColumns(): void {
    (this.committeeMembersColumns = [
      {
        name: "Position",
        dataKey: "position",
        position: "left",
        isSortable: true,
      },
      {
        name: "Member Name",
        dataKey: "fullName",
        position: "left",
        isSortable: true,
      },
      {
        name: "Duration",
        dataKey: "duration",
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
        name: "Start Date",
        dataKey: "startDate",
        position: "left",
        isSortable: true,
        dataType: "Date",
      },
      {
        name: "End Date",
        dataKey: "endDate",
        position: "left",
        isSortable: true,
        dataType: "Date",
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
    ]),
      (this.attachmentColumns = [
        {
          name: "Date",
          dataKey: "attachmentDate",
          position: "left",
          isSortable: true,
          dataType: "Date",
        },
        {
          name: "Attachment Name",
          dataKey: "docName",
          position: "left",
          isSortable: true,
        },
        {
          name: "Attachment Type",
          dataKey: "docType",
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
          isSortable: false,
        },
      ]);
  }
}
