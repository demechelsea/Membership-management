import { Component, OnInit, ViewChild } from '@angular/core';
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
import * as moment from 'moment';
import { PoliciesAndDocstorePopupComponent } from './policiesAndDocstore-popup/policiesAndDocstore.component';
import { AssociationDocstoreDTO } from 'app/models/assocationAttachmmentDTO';
import { AssocationAttachmentService } from 'app/association-settings/services/assocation-attachment-service/assocationAttachment.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-policiesAndDocstore',
  templateUrl: './policiesAndDocstore.component.html',
  styleUrls: ['./policiesAndDocstore.component.scss'],
  animations: SoraxAnimations
})
export class PoliciesAndDocstoreComponent extends BaseComponent implements OnInit {

  public policiesAndDocstoreData: any;
  public policiesAndDocstoreColumns: SoraxColumnDefinition[];
  

  @ViewChild('showToPublicTemplate') showToPublicTemplate: any;

  public listpoliciesAndDocstore: AssociationDocstoreDTO[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();

  constructor(private dialog: MatDialog,
    private notificationService: NotificationService,
    private assocationAttachmentService: AssocationAttachmentService,
    private loader: AppLoaderService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.initializeColumns();
    this.getPoliciesAndDocstoreData();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  filterControl = new FormControl();

  filterText: string;

  applyAttachmentFilter() {
    if (this.filterText) {
      this.policiesAndDocstoreData = this.listpoliciesAndDocstore.filter(row =>
        row.docType.includes(this.filterText) || row.docName.includes(this.filterText)
      );
    } else {
      this.policiesAndDocstoreData = this.listpoliciesAndDocstore;
    }
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  getPoliciesAndDocstoreData() {
    this.assocationAttachmentService.getAssocationAttachments(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
         Object.assign(this.resultViewModel, response);
         Object.assign(this.page, this.resultViewModel.page);

        this.listpoliciesAndDocstore = this.resultViewModel.result;

        this.policiesAndDocstoreData = this.listpoliciesAndDocstore.map(attachment => ({
          ...attachment,
          assocationAttachmentDate: `${moment(attachment.modifiedTimestamp).format('YYYY-MM-DD')}`
        }));
      });
  }

  openPoliciesAndDocstorePopUp(data: AssociationDocstoreDTO, isNew?: boolean) {
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

  deleteAssocationAttachments(row: any) {
    this.assocationAttachmentService.deleteAssocationAttachment(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        if (response.success) {
          this.notificationService.showSuccess(response.messages[0].message);
          this.getPoliciesAndDocstoreData();
        }
        else {
          this.notificationService.showError(response.messages[0].message);
        }
      });
  }

  onShowToPublicToggleChange(row: any) {
    row.displayToPublicFlg = !row.displayToPublicFlg;
    row.displayToPublicFlg = row.displayToPublicFlg ? "Y" : "N";
    this.assocationAttachmentService.updateAssocationAttachment(row)
      .subscribe(response => {
        if (response.success) {
          this.notificationService.showSuccess(response.messages[0].message);
          this.getPoliciesAndDocstoreData();
        }
        else {
          this.notificationService.showError(response.messages[0].message);
        }
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
        dataKey: 'assocationAttachmentDate',
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
        dataKey: 'displayToPublicFlg',
        position: 'left',
        isSortable: true,
        cellTemplate: this.showToPublicTemplate,
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
