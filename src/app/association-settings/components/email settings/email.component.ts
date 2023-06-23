import { Component, EventEmitter, Input, ViewChild, OnInit, AfterViewInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { soraxAnimations } from 'app/common/animations/sorax-animations';
import { SoraxColumnDefinition } from 'app/common/components/sorax-table-view/sorax-column-definition';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResultViewModel } from 'app/models/result-view-model';
import { Subject, takeUntil } from 'rxjs';
import { CommitteeMemberDTO } from 'app/models/committeeMemberDTO';
import { EmailSettingService } from 'app/association-settings/services/emailSettingService/emailSetting.service';
import { EmailSettingDTO } from 'app/models/emailSettingDTO';
import { EmailTemplateDTO } from 'app/models/emailTemplateDTO';
import { EmailTemplateService } from 'app/association-settings/services/emailTemplate/emailTemplate.service';


@Component({
  selector: 'email-settings',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: soraxAnimations
})
export class EmailComponent extends BaseComponent implements OnInit {

  public emailSettingData: any;
  public emailTemplateData: any;
  public emailHistorytData: any;
  public emailUnsubscribedListstData: any;

  public emailTemplateColumns: SoraxColumnDefinition[];
  public emailUnsubscribedListsColumn: SoraxColumnDefinition[];
  public emailHistoryColumn: SoraxColumnDefinition[];
  public emailSettingColumn: SoraxColumnDefinition[];

  public listTemplateEmails: EmailTemplateDTO[];
  public listEmailSetting: EmailSettingDTO[];
  public listEmailHistory: EmailSettingDTO[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();

  constructor(private dialog: MatDialog,
    private notificationService: NotificationService,
    private emailSettingService: EmailSettingService,
    private emailTemplateService: EmailTemplateService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,) {
    super();
  }
  ngOnInit(): void {
    this.initializeColumns();
    this.getEmailTemplateData();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


  getEmailTemplateData() {
    this.emailTemplateService.getEmailTemplates(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        console.log(response);
        this.listTemplateEmails = response.result;
        this.emailTemplateData = this.listTemplateEmails;
      });
  }

  getEmailSettingData() {
    this.emailSettingService.getEmailSetting(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        console.log(response);
        this.listEmailSetting = response.result;
        this.emailSettingData = this.listEmailSetting;
      });
  }

  // getEmailUnsubscribeListData() {
  //   this.emailTemplateService.getEmailTemplates(this.page)
  //     .pipe(takeUntil(this.ngUnsubscribe$))
  //     .subscribe(response => {
  //       console.log(response);
  //       this.listTemplateEmails = response.result;
  //       this.emailTemplateData = this.listTemplateEmails;
  //     });
  // }

  // getEmailHistoryData() {
  //   this.emailSettingService.getEmailSetting(this.page)
  //     .pipe(takeUntil(this.ngUnsubscribe$))
  //     .subscribe(response => {
  //       console.log(response);
  //       this.listEmailHistory = response.result;
  //       this.emailHistorytData = this.listEmailHistory;
  //     });
  // }

  committeeExecuteRowActions(rowData: CommitteeMemberDTO) {
    if (rowData.performAction == "edit") {
      // this.openCommitteeMemberPopUp(rowData, false);
    } else {
      console.log("Delete action performed");
    }
  }

  sortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getEmailTemplateData();
  }

  pageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getEmailTemplateData();
  }


  initializeColumns(): void {
    this.emailTemplateColumns = [
      {
        name: 'Template Name',
        dataKey: 'templateName',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Subject',
        dataKey: 'subject',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Enable Auto Email',
        dataKey: 'duration',
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
        isSortable: true,
      },
    ],

      this.emailUnsubscribedListsColumn = [
        {
          name: 'Email Id',
          dataKey: 'attachmentDate',
          position: 'left',
          isSortable: true,
          dataType: "Date",
        },
        {
          name: 'Unsubscribed On',
          dataKey: 'docName',
          position: 'left',
          isSortable: true,
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
      ],
      
      this.emailHistoryColumn = [
        {
          name: 'Email Subject',
          dataKey: 'position',
          position: 'left',
          isSortable: true,
        },
        {
          name: 'Email Ids',
          dataKey: 'fullName',
          position: 'left',
          isSortable: true,
        },
        {
          name: 'People',
          dataKey: 'duration',
          position: 'left',
          isSortable: true,
        },
        {
          name: 'Sent By',
          dataKey: 'modifiedUser',
          position: 'left',
          isSortable: true,
        },
        {
          name: 'Sent On',
          dataKey: 'docName',
          position: 'left',
          isSortable: true,
        },
      ]
  }
}
