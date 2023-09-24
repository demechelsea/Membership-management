import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { SoraxColumnDefinition } from "app/common/components/sorax-table-view/sorax-column-definition";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject, takeUntil } from "rxjs";
import { CommitteeMemberDTO } from "app/models/committeeMemberDTO";
import { MessageSettingDTO } from "app/models/messageSettingDTO";
import { MessageTemplateDTO } from "app/models/messageTemplateDTO";
import { SmsSettingService } from "app/association-settings/services/smsSettingService/smsSetting.service";
import { SmsTemplateService } from "app/association-settings/services/smsTemplate/smsTemplate.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MessageSubscriptionDTO } from "app/models/MessageSubscriptionDTO";
import { SMSUnsubscriptionService } from "app/association-settings/services/smsUnsubscriptionService/smsUnsubscription.service";
import { SmsHistoryService } from "app/association-settings/services/smsHistoryService/smsHistory.service";
import { MessageHistoryDTO } from "app/models/messageHistoryDTO";
import * as moment from "moment";
import { SMSTemplatePopupComponent } from "./smsTemplate-Popup/smsTemplate-Popup.component";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { SMSSenderProfilePopupComponent } from "./SMS-senders-profile-popup/SMSsenderProfile-popup.component";

@Component({
  selector: "sms-settings",
  templateUrl: "./sms.component.html",
  styleUrls: ["./sms.component.scss"],
  animations: SoraxAnimations,
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
  public SMSsendersProfileForm: FormGroup;

  smsContent: boolean = false;

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private smsSettingService: SmsSettingService,
    private smsTemplateService: SmsTemplateService,
    private smsUnsubscribeService: SMSUnsubscriptionService,
    private smsHistoryService: SmsHistoryService,
    private formBuilder: FormBuilder
  ) {
    super();
  }
  ngOnInit(): void {
    this.initializeColumns();
    this.buildSmsUnsubscribeListForm(new MessageSubscriptionDTO());
    this.buildSMTPForm(new MessageSettingDTO());
    this.smsSettingService.getSmsSetting().subscribe((response) => {
      console.log(response);
      if (response.result != null) {
        const smsSetting = response.result;
        this.SMSsendersProfileForm.patchValue({
          smsName: smsSetting.smsName,
          smsIdentify: smsSetting.smsIdentify,
        });
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.getSmsTemplateData();
    } else if (event.index === 2) {
      this.getSmsUnsubscribeData();
    } else if (event.index === 3) {
      this.getSmsHistoryData();
    }
  }

  buildSmsUnsubscribeListForm(smsSubscriptionData: MessageSubscriptionDTO) {
    this.smsUnsubscribeListForm = this.formBuilder.group({
      phoneNumber: [
        smsSubscriptionData.phoneNumber || "",
        [
          Validators.required,
          Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$') 
        ]
      ],
    });
  }

  buildSmsHistoryForm(emailHistoryData: MessageHistoryDTO) {
    this.smsHistoryForm = this.formBuilder.group({
      msgSubject: [{ value: emailHistoryData.msgSubject, disabled: true }],
      msgContent: [{ value: emailHistoryData.msgContent, disabled: true }],
      recipients: [{ value: emailHistoryData.recipients, disabled: true }],
      modifiedTimestamp: [
        {
          value: moment(emailHistoryData.modifiedTimestamp).format(
            "YYYY-MM-DD"
          ),
          disabled: true,
        },
      ],
    });
  }

  buildSMTPForm(SMSSettingDTO: MessageSettingDTO) {
    this.SMSsendersProfileForm = this.formBuilder.group({
      id: [SMSSettingDTO.id, Validators.required],
      smsName: [SMSSettingDTO.smsName, Validators.required],
      smsIdentify: [SMSSettingDTO.smsIdentify, Validators.required],
    });
    this.SMSsendersProfileForm.get("smsName").disable();
    this.SMSsendersProfileForm.get("smsIdentify").disable();
  }

  filterControl = new FormControl();

  filterText: string;

  applyHistoryFilter() {
    if (this.filterText) {
      this.smsHistorytData = this.listSmsHistory.filter(
        (row) =>
          row.msgSubject.includes(this.filterText) ||
          row.recipients.includes(this.filterText)
      );
    } else {
      this.smsHistorytData = this.listSmsHistory;
    }
  }

  applyUnsubscribedFilter() {
    if (this.filterText) {
      this.smsUnsubscribedListData = this.listSmsUnsubscribe.filter((row) =>
        row.phoneNumber.includes(this.filterText)
      );
    } else {
      this.smsUnsubscribedListData = this.listSmsUnsubscribe;
    }
  }
  executeSystemTemplatesRowActions(row: MessageTemplateDTO) {
    if (row.performAction == "Edit") {
      this.openSMSTemplatePopUp(row);
    }
  }

  executeSMSUnsubscriptionRowActions(row: MessageSubscriptionDTO) {
    if (row.performAction == "Delete") {
      this.deleteUnsubscribeList(row);
    }
  }

  executeSMSHistoryRowActions(row: MessageHistoryDTO) {
    if (row.performAction == "View") {
      this.showSMSContent(row);
    }
  }

  showSMSContent(data: MessageHistoryDTO) {
    this.smsContent = true;
    this.buildSmsHistoryForm(data);
  }

  close() {
    this.smsContent = false;
  }

  getSmsTemplateData() {
    this.smsTemplateService
      .getSmsTemplates(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        if (response.result != null) {
          this.page.totalItems = response.page.totalItems;
          this.listTemplateSms = response.result;
          this.smsTemplateData = this.listTemplateSms;
        }
      });
  }

  getSmsUnsubscribeData() {
    this.smsUnsubscribeService
      .getSmsUnsubscribedList(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        if (response.result != null) {
          Object.assign(this.resultViewModel, response);
          Object.assign(this.page, this.resultViewModel.page);
          this.listSmsUnsubscribe = this.resultViewModel.result;
          this.smsUnsubscribedListData = this.listSmsUnsubscribe;
        }
      });
  }

  getSmsHistoryData() {
    this.smsHistoryService
      .getSmsHistoryList(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        if (response.result != null) {
          Object.assign(this.resultViewModel, response);
          Object.assign(this.page, this.resultViewModel.page);
          this.listSmsHistory = this.resultViewModel.result;
          this.smsHistorytData = this.listSmsHistory;
        }
      });
  }

  editSMSTemplate(row: any) {
    this.openSMSTemplatePopUp(row);
  }

  openSMSTemplatePopUp(data?: MessageTemplateDTO) {
    let title = "Edit SMS template";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      SMSTemplatePopupComponent,
      {
        width: "720px",
        disableClose: true,
        data: {
          title: title,
          payload: data,
        },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        console.log("no res", res);
        return;
      }
      this.getSmsTemplateData();
    });
  }

  deleteUnsubscribeList(row: any) {
    this.smsUnsubscribeService
      .deleteSmsUnsubscribedList(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        if (response.success) {
          this.notificationService.showSuccess(response.messages[0].message);
        } else {
          this.notificationService.showError(response.messages[0].message);
        }
      });
  }

  submit() {
    if (this.smsUnsubscribeListForm.valid) {
      const formData = this.smsUnsubscribeListForm.value;
      this.smsUnsubscribeService
        .addSmsToUnsubscribedList(formData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          if (response.success) {
            this.notificationService.showSuccess(response.messages[0].message);
            this.getSmsUnsubscribeData();
          } else {
            this.notificationService.showError(response.messages[0].message);
          }
        });
    } else {
      this.notificationService.showWarning(
        "Please enter a valid phone number."
      );
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
    this.smsUnsubscribeService
      .deleteSmsUnsubscribedList(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (response) => {
          this.notificationService.showSuccess(
            "Attachment deleted successfully!"
          );
          this.getSmsUnsubscribeData();
        },
        (error) => {
          this.notificationService.showError(
            "Failed to delete attachment. Please try again later."
          );
          console.error("Failed to delete attachment:", error);
        }
      );
  }

  smsHistorySortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getSmsHistoryData();
  }

  smsUnsubscriptionSortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getSmsUnsubscribeData();
  }

  smsmHistoryPageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getSmsHistoryData();
  }

  smsUnsubscriptionPageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getSmsUnsubscribeData();
  }

  openSendersProfilePopUp(data: MessageSettingDTO) {
    let title = "Edit SMS senders profile";
    this.smsSettingService
      .getSmsSetting()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        let dialogRef: MatDialogRef<any> = this.dialog.open(
          SMSSenderProfilePopupComponent,
          {
            width: "720px",
            disableClose: true,
            data: { title: title, payload: data },
          }
        );
        dialogRef.afterClosed().subscribe((res) => {
          if (!res) {
            return;
          }
          this.smsSettingService.getSmsSetting().subscribe((response) => {
            if (response.result != null) {
              const smsSetting = response.result;
              this.SMSsendersProfileForm.patchValue({
                smsName: smsSetting.smsName,
                smsIdentify: smsSetting.smsIdentify,
              });
            }
          });
        });
      });
  }

  initializeColumns(): void {
    (this.smsTemplateColumns = [
      {
        name: "Template Name",
        dataKey: "name",
        position: "left",
        isSortable: true,
      },
      {
        name: "Subject",
        dataKey: "subject",
        position: "left",
        isSortable: true,
      },
      {
        name: "Enable Auto SMS",
        dataKey: "enableAutoFlg",
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
    ]),
      (this.smsUnsubscribedListsColumn = [
        {
          name: "Phone number",
          dataKey: "phoneNumber",
          position: "left",
          isSortable: true,
        },
        {
          name: "Unsubscribed On",
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
      ]),
      (this.smsHistoryColumn = [
        {
          name: "SMS Subject",
          dataKey: "msgSubject",
          position: "left",
          isSortable: true,
          clickEvent: (data) => {
            this.showSMSContent(data);
          },
        },
        {
          name: "Phone#",
          dataKey: "recipients",
          position: "left",
          isSortable: true,
        },
        {
          name: "#People",
          dataKey: "duration",
          position: "left",
          isSortable: true,
        },
        {
          name: "Sent By",
          dataKey: "modifiedUser",
          position: "left",
          isSortable: true,
        },
        {
          name: "Sent On",
          dataKey: "modifiedTimestamp",
          position: "left",
          isSortable: true,
          dataType: "Date",
        },
      ]);
  }
}
