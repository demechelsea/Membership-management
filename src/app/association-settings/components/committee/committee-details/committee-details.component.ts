import { Component, EventEmitter, Input, ViewChild,OnInit,AfterViewInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { CommitteeMemberService } from 'app/association-settings/services/committee-member-service/committee-member.service';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';
import { SoraxColumnDefinition } from 'app/common/components/sorax-table-view/sorax-column-definition';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResultViewModel } from 'app/models/result-view-model';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CommitteeMemberPopupComponent } from './committee-member-popup/committee-member-popup.component';
import { AttachmentPopupComponent } from './attachment-popup/attachment-popup.component';
import { CommitteeMemberDTO } from 'app/models/committeeMemberDTO';
import { AttachmentService } from 'app/association-settings/services/attachment-service/attachment.service';
import { CommitteeMemberAttachmentDTO } from 'app/models/committeeMemberAttachmmentDTO';
import * as moment from 'moment';
import { opencommitteeMemberPopupService } from 'app/association-settings/services/opencommitteeMemberPopup-service/opencommitteeMemberPopup.service';


@Component({
  selector: 'committee-member-details',
  templateUrl: './committee-details.component.html',
  styleUrls: ['./committee-details.component.scss'],
  animations: SoraxAnimations
})
export class DetailsComponent extends BaseComponent implements OnInit {

  @Input() selectedRow: any;
  @Output() addPosition: EventEmitter<void> = new EventEmitter<void>();

  public committeeMembersData: any;
  public attachmentData: any;
  public committeeMembersColumns: SoraxColumnDefinition[];
  public attachmentColumns: SoraxColumnDefinition[];

  @Output() viewCommittee: EventEmitter<void> = new EventEmitter<void>();

  public listAttachments: CommitteeMemberAttachmentDTO[];
  public listCommitteeMembers: CommitteeMemberDTO[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  rowAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog,
    private notificationService: NotificationService,
    private committeeService: CommitteeMemberService,
    private attachmentService: AttachmentService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private opencommitteeMemberPopupService: opencommitteeMemberPopupService) {
    super();
  }
  ngOnInit(): void {
    this.initializeColumns();
    this.getCommitteeMembersData();
    this.getAttachmentData();
    let committeeModel = new CommitteeMemberDTO();
    this.opencommitteeMemberPopupService.openCommitteeMemberPopup$.subscribe(() => {
      this.openCommitteeMemberPopUp(committeeModel, true)
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getCommitteeMembersData() {
    this.committeeService.getCommitteeMembers(this.page, this.selectedRow.id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.listCommitteeMembers = response.result;
        this.committeeMembersData = this.listCommitteeMembers.map(committeeMember => {
          const start = new Date(committeeMember.startDate);
          const end = new Date(committeeMember.endDate);
          const durationInMonths = this.calculateDurationInMonths(start, end);
          return {
            ...committeeMember,
            fullName: `${committeeMember.associationMember.userDetail.firstName} ${committeeMember.associationMember.userDetail.givenName}  ${committeeMember.associationMember.userDetail.parentName}`,
            position: `${committeeMember.committeePosition.positionName}`,
            duration: `${durationInMonths} months`
          };
        });
      });
  }

  viewCommittees(){
    this.viewCommittee.emit();
  }

  getAttachmentData() {
    this.attachmentService.getAttachments(this.page, this.selectedRow.id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.listAttachments = response.result;
        this.attachmentData = this.listAttachments.map(attachment => ({
          ...attachment,
          attachmentDate: `${moment(attachment.modifiedTimestamp).format('YYYY-MM-DD')}`
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
    let title = isNew ? 'Create a new committee member' : 'Edit committee member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(CommitteeMemberPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, isNew: isNew, selectedCommittee: this.selectedRow, associationMemberId: data?.associationMember?.id,
        positionId: data?.committeePosition?.id, selectedCommitteeMember: data.id }
    });
    dialogRef.componentInstance.addPosition.subscribe(() => {
      this.addPosition.emit();
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        console.log("no res", res);
        return;
      }
        this.getCommitteeMembersData();
    }
    );
  }

  openAttachementPopUp(data: CommitteeMemberDTO, isNew?: boolean) {
    let title = isNew ? 'Add New Attachment' : 'Edit Attachment';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AttachmentPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, isNew: isNew, id: this.selectedRow.id }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          console.log("no res", res)
          return;
        }
        this.getAttachmentData();
      })
  }

  deleteAttachments(row: any) {
    this.attachmentService.deleteAttachment(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.notificationService.showSuccess('Attachment deleted successfully!');
        this.getAttachmentData();
      }, error => {
        this.notificationService.showError('Failed to delete attachment. Please try again later.');
        console.error('Failed to delete attachment:', error);
      });
  }
  

  committeeExecuteRowActions(rowData: CommitteeMemberDTO) {
    if (rowData.performAction == "edit") {
      this.openCommitteeMemberPopUp(rowData, false);
    } else {
      console.log("Delete action performed");
    }
  }

  sortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getCommitteeMembersData();
  }

  pageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getCommitteeMembersData();
  }


  initializeColumns(): void {
    this.committeeMembersColumns = [
      {
        name: 'Position',
        dataKey: 'position',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Member Name',
        dataKey: 'fullName',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Duration',
        dataKey: 'duration',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Status',
        dataKey: 'status',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Start Date',
        dataKey: 'startDate',
        position: 'left',
        isSortable: true,
        dataType: "Date",
      },
      {
        name: 'End Date',
        dataKey: 'endDate',
        position: 'left',
        isSortable: true,
        dataType: "Date",
      },
      {
        name: 'Updated On',
        dataKey: 'modifiedTimestamp',
        position: 'left',
        isSortable: true,
        dataType: "Date",
      },
      {
        name: 'Updated By',
        dataKey: 'modifiedUser',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Action',
        dataKey: 'action',
        position: 'left',
        isSortable: true,
      },
    ],

      this.attachmentColumns = [
        {
          name: 'Date',
          dataKey: 'attachmentDate',
          position: 'left',
          isSortable: true,
          dataType: "Date",
        },
        {
          name: 'Attachment Name',
          dataKey: 'docName',
          position: 'left',
          isSortable: true,
        },
        {
          name: 'Attachment Type',
          dataKey: 'docType',
          position: 'left',
          isSortable: true,
        },
        {
          name: 'Updated On',
          dataKey: 'modifiedTimestamp',
          position: 'left',
          isSortable: true,
          dataType: "Date",
        },
        {
          name: 'Updated By',
          dataKey: 'modifiedUser',
          position: 'left',
          isSortable: true,
        },
        {
          name: 'Action',
          dataKey: 'action',
          position: 'left',
          isSortable: false,
        },
      ];

  }
}
