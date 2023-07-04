import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';
import { SoraxColumnDefinition } from 'app/common/components/sorax-table-view/sorax-column-definition';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResultViewModel } from 'app/models/result-view-model';
import { Subject, takeUntil } from 'rxjs';
import { CommitteeMemberDTO } from 'app/models/committeeMemberDTO';
import { AttachmentService } from 'app/association-settings/services/attachment-service/attachment.service';
import { CommitteeMemberAttachmentDTO } from 'app/models/committeeMemberAttachmmentDTO';
import * as moment from 'moment';
import { PoliciesAndDocstorePopupComponent } from './policiesAndDocstore-popup/policiesAndDocstore.component';


@Component({
  selector: 'app-policiesAndDocstore',
  templateUrl: './policiesAndDocstore.component.html',
  styleUrls: ['./policiesAndDocstore.component.scss'],
  animations: SoraxAnimations
})
export class PoliciesAndDocstoreComponent extends BaseComponent implements OnInit {

  public policiesAndDocstoreData: any;
  public policiesAndDocstoreColumns: SoraxColumnDefinition[];

  public listpoliciesAndDocstore: CommitteeMemberAttachmentDTO[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();

  constructor(private dialog: MatDialog,
    private notificationService: NotificationService,
    private attachmentService: AttachmentService,
    private loader: AppLoaderService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.initializeColumns();
    //this.getPoliciesAndDocstoreData();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getPoliciesAndDocstoreData() {
    this.attachmentService.getAttachments(this.page, 1)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.listpoliciesAndDocstore = response.result;
        this.policiesAndDocstoreData = this.listpoliciesAndDocstore.map(attachment => ({
          ...attachment,
          attachmentDate: `${moment(attachment.modifiedTimestamp).format('YYYY-MM-DD')}`
        }));
      });
  }

  openPoliciesAndDocstorePopUp(data: CommitteeMemberDTO, isNew?: boolean) {
    let title = isNew ? 'Add New Attachment' : 'Edit Attachment';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PoliciesAndDocstorePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, isNew: isNew }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          console.log("no res", res)
          return;
        }
        this.getPoliciesAndDocstoreData();
      })
  }

  deleteAttachments(row: any) {
    this.attachmentService.deleteAttachment(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.notificationService.showSuccess('Attachment deleted successfully!');
        this.getPoliciesAndDocstoreData();
      }, error => {
        this.notificationService.showError('Failed to delete attachment. Please try again later.');
        console.error('Failed to delete attachment:', error);
      });
  }


  sortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getPoliciesAndDocstoreData();
  }

  pageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getPoliciesAndDocstoreData();
  }


  initializeColumns(): void {
    this.policiesAndDocstoreColumns = [
      {
        name: 'Date',
        dataKey: 'attachmentDate',
        position: 'left',
        isSortable: true,
        dataType: "Date",
      },
      {
        name: 'Document Name',
        dataKey: 'docName',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Document Type',
        dataKey: 'docType',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Show to public',
        dataKey: 'stat',
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
        isSortable: false,
      },
    ];

  }
}
