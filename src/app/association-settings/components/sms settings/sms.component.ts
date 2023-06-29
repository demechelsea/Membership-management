import { Component, EventEmitter, Input, ViewChild, OnInit, AfterViewInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';
import { SoraxColumnDefinition } from 'app/common/components/sorax-table-view/sorax-column-definition';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResultViewModel } from 'app/models/result-view-model';
import { Subject, takeUntil } from 'rxjs';
import { CommitteeMemberDTO } from 'app/models/committeeMemberDTO';
import { MessageSettingDTO } from 'app/models/messageSettingDTO';
import { MessageTemplateDTO } from 'app/models/messageTemplateDTO';
import { SmsSettingService } from 'app/association-settings/services/smsSettingService/smsSetting.service';
import { SmsTemplateService } from 'app/association-settings/services/smsTemplate/smsTemplate.service';
import { SMSSenderProfilePopupComponent } from './SMS senders profile-popup/SMSsenderProfile-popup.component';
import { EmailSettingDTO } from 'app/models/emailSettingDTO';


@Component({
  selector: 'sms-settings',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
  animations: SoraxAnimations
})
export class SmsComponent extends BaseComponent implements OnInit {

  public smsSettingData: any;
  public smsTemplateData: any;
  public smsHistorytData: any;
  public smsUnsubscribedListData: any;

  public smsTemplateColumns: SoraxColumnDefinition[];
  public smsUnsubscribedListsColumn: SoraxColumnDefinition[];
  public smsHistoryColumn: SoraxColumnDefinition[];

  public listTemplateSms: MessageTemplateDTO[];
  public listSmsSetting: MessageSettingDTO[];
  public listUnsubscribeList: MessageSettingDTO[];
 // public listSmsHistory: EmailSettingDTO[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();

  constructor(private dialog: MatDialog,
    private notificationService: NotificationService,
    private smsSettingService: SmsSettingService,
    private smsTemplateService: SmsTemplateService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,) {
    super();
  }
  ngOnInit(): void {
    this.initializeColumns();
    this.getSmsTemplateData();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


  getSmsTemplateData() {
    this.smsTemplateService.getSmsTemplates(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        console.log(response);
        this.listTemplateSms = response.result;
        this.smsTemplateData = this.listTemplateSms;
      });
  }

  getSmsSettingData() {
    this.smsSettingService.getSmsSetting(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        console.log(response);
        this.listSmsSetting = response.result;
        this.smsSettingData = this.listSmsSetting;
      });
  }

  // getSmsUnsubcribeListData() {
  //   this.smsSettingService.getSmsSetting(this.page)
  //     .pipe(takeUntil(this.ngUnsubscribe$))
  //     .subscribe(response => {
  //       console.log(response);
  //       this.listSmsSetting = response.result;
  //       this.smsSettingData = this.listSmsSetting;
  //     });
  // }

  // getSmsHistoryData() {
  //   this.smsSettingService.getSmsSetting(this.page)
  //     .pipe(takeUntil(this.ngUnsubscribe$))
  //     .subscribe(response => {
  //       console.log(response);
  //       this.listSmsHistory = response.result;
  //       this.smsHistorytData = this.listSmsHistory;
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
    this.getSmsTemplateData();
  }

  pageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getSmsTemplateData();
  }

  openSendersProfilePopUp(data: EmailSettingDTO) {
    let title = 'Edit SMTP Email setting';
    let dialogRef: MatDialogRef<any> = this.dialog.open(SMSSenderProfilePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data}
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }
      })
  }


  initializeColumns(): void {
    this.smsTemplateColumns = [
      {
        name: 'Template Name',
        dataKey: 'name',
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
        name: 'Enable Auto SMS',
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

      this.smsUnsubscribedListsColumn = [
        {
          name: 'Phone number',
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
      
      this.smsHistoryColumn = [
        {
          name: 'SMS Subject',
          dataKey: 'position',
          position: 'left',
          isSortable: true,
        },
        {
          name: 'Phone#',
          dataKey: 'fullName',
          position: 'left',
          isSortable: true,
        },
        {
          name: '#People',
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
