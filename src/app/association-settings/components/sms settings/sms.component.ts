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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageSubscriptionDTO } from 'app/models/MessageSubscriptionDTO';
import { SMSUnsubscriptionService } from 'app/association-settings/services/smsUnsubscriptionService/smsUnsubscription.service';
import { SmsHistoryService } from 'app/association-settings/services/smsHistoryService/smsHistory.service';
import { MessageHistoryDTO } from 'app/models/messageHistoryDTO';
import * as moment from 'moment';


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
  public listSmsUnsubscribe: MessageSubscriptionDTO[];
  public listSmsHistory: MessageHistoryDTO[];

  public smsUnsubscribeListForm: FormGroup;
  public smsHistoryForm: FormGroup;


  smsContent: boolean = false;

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();

  constructor(private dialog: MatDialog,
    private notificationService: NotificationService,
    private smsSettingService: SmsSettingService,
    private smsTemplateService: SmsTemplateService,
    private smsUnsubscribeService: SMSUnsubscriptionService,
    private smsHistoryService: SmsHistoryService,
    private loader: AppLoaderService,
    private formBuilder: FormBuilder,
    private confirmService: AppConfirmService,) {
    super();
  }
  ngOnInit(): void {
    this.initializeColumns();
    this.page.pageSize = 7;
    this.page.sortColumn = 'planName';
    this.page.sortDirection = 'asc';
    this.getSmsTemplateData();
    this.getSmsUnsubscribeData();
    this.getSmsHistoryData();
    this.buildSmsUnsubscribeListForm(new MessageSubscriptionDTO());
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  buildSmsUnsubscribeListForm(smsSubscriptionData: MessageSubscriptionDTO) {
    this.smsUnsubscribeListForm = this.formBuilder.group({
      phoneNumber: [smsSubscriptionData.phoneNumber || ''],
    });
  }

  buildSmsHistoryForm(emailHistoryData: MessageHistoryDTO) {
    this.smsHistoryForm = this.formBuilder.group({
      msgSubject: [{ value: emailHistoryData.msgSubject, disabled: true }],
      msgContent: [{ value: emailHistoryData.msgContent, disabled: true }],
      recipients: [{ value: emailHistoryData.recipients, disabled: true }],
      modifiedTimestamp: [{ value: moment(emailHistoryData.modifiedTimestamp).format('YYYY-MM-DD') , disabled: true }],
    });
  }


  filterControl = new FormControl();

  filterText: string;

  applyHistoryFilter() {
    if (this.filterText) {
      this.smsHistorytData = this.listSmsHistory.filter(row =>
        row.msgSubject.includes(this.filterText) || row.recipients.includes(this.filterText)
      );
    } else {
      this.smsHistorytData = this.listSmsHistory;
    }
  }

  applyUnsubscribedFilter() {
    if (this.filterText) {
      this.smsUnsubscribedListData = this.listSmsUnsubscribe.filter(row =>
        row.phoneNumber.includes(this.filterText)
      );
    } else {
      this.smsUnsubscribedListData = this.listSmsUnsubscribe;
    }
  }


  
  showEmailContent(data:MessageHistoryDTO){
    this.smsContent = true;
    this.buildSmsHistoryForm(data);
  }

  close(){
    this.smsContent = false;
  }

  getSmsTemplateData() {
    this.smsTemplateService.getSmsTemplates(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.listTemplateSms = response.result;
        this.smsTemplateData = this.listTemplateSms;
      });
  }

  getSmsUnsubscribeData() {
    this.smsUnsubscribeService.getSmsUnsubscribedList(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.listSmsUnsubscribe = response.result;
        this.smsUnsubscribedListData = this.listSmsUnsubscribe;
      });
  }

   getSmsHistoryData() {
    this.smsHistoryService.getSmsHistoryList(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.listSmsHistory = response.result;
        this.smsHistorytData = this.listSmsHistory;
      });
  }

  deleteUnsubscribeList(row: any) {
    this.smsUnsubscribeService.deleteSmsUnsubscribedList(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        if (response.success) {
          this.notificationService.showSuccess(response.messages[0].message);
        }
        else {
          this.notificationService.showError(response.messages[0].message);
        }
      });
  }

  submit() {
    if (this.smsUnsubscribeListForm.valid) {
      const formData = this.smsUnsubscribeListForm.value;
      this.smsUnsubscribeService.addSmsToUnsubscribedList(formData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(response => {
          if (response.success) {
            this.notificationService.showSuccess(response.messages[0].message);
            this. getSmsUnsubscribeData();
          }
          else {
            this.notificationService.showError(response.messages[0].message);
          }
        });
    } else {
      this.notificationService.showWarning('Please enter a valid email address.');
    }
  }

  committeeExecuteRowActions(rowData: CommitteeMemberDTO) {
    if (rowData.performAction == "edit") {
      // this.openCommitteeMemberPopUp(rowData, false);
    } else {
      console.log("Delete action performed");
    }
  }

  deleteUnsubscribeSmsList(row: any) {
    this.smsUnsubscribeService.deleteSmsUnsubscribedList(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.notificationService.showSuccess('Attachment deleted successfully!');
        this.getSmsUnsubscribeData();
      }, error => {
        this.notificationService.showError('Failed to delete attachment. Please try again later.');
        console.error('Failed to delete attachment:', error);
      });
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

  openSendersProfilePopUp(data: MessageSettingDTO) {
    let title = 'Edit SMS senders profile';
    this.smsSettingService.getSmsSetting()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        let dialogRef: MatDialogRef<any> = this.dialog.open(SMSSenderProfilePopupComponent, {
          width: '720px',
          disableClose: true,
          data: { title: title, payload: data }
        })
        dialogRef.afterClosed()
          .subscribe(res => {
            if (!res) {
              return;
            }
          })
      });
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
          dataKey: 'phoneNumber',
          position: 'left',
          isSortable: true,
        },
        {
          name: 'Unsubscribed On',
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
      ],

      this.smsHistoryColumn = [
        {
          name: 'SMS Subject',
          dataKey: 'msgSubject',
          position: 'left',
          isSortable: true,
          clickEvent: (data) => {
            this.showEmailContent(data);
          },
        },
        {
          name: 'Phone#',
          dataKey: 'recipients',
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
          dataKey: 'modifiedTimestamp',
          position: 'left',
          isSortable: true,
          dataType: "Date",
        },
      ]

  }
}
