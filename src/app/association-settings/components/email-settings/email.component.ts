import {
  Component,
  OnInit
} from "@angular/core";
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
import { Subject, takeUntil } from "rxjs";
import { CommitteeMemberDTO } from "app/models/committeeMemberDTO";
import { EmailSettingService } from "app/association-settings/services/emailSettingService/emailSetting.service";
import { EmailSettingDTO } from "app/models/emailSettingDTO";
import { EmailTemplateDTO } from "app/models/emailTemplateDTO";
import { EmailTemplateService } from "app/association-settings/services/emailTemplate/emailTemplate.service";
import { SMTPPopupComponent } from "./SMTP-popup/SMTP-popup.component";
import { EmailSendersProfilePopupComponent } from "./emailSendersProfile-Popup/emailSendersProfile-Popup.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { EmailSubscriptionDTO } from "app/models/emailSubscriptionDTO";
import { EmailUnsubscriptionService } from "app/association-settings/services/emailUnsubscriptionService/emailUnsubscription.service";
import { EmailHistoryService } from "app/association-settings/services/emailHistoryService/emailHistory.service";
import { EmailHistoryDTO } from "app/models/emailHistoryDTO";
import * as moment from "moment";
import { EmailTemplatePopupComponent } from "./emailTemplate-Popup/emailTemplate-Popup.component";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "email-settings",
  templateUrl: "./email.component.html",
  styleUrls: ["./email.component.scss"],
  animations: SoraxAnimations,
})
export class EmailComponent extends BaseComponent implements OnInit {
  public emailSettingData: any;
  public emailTemplateData: any;
  public emailHistoryData: any;
  public emailUnsubscribedListstData: any;

  public emailTemplateColumns: SoraxColumnDefinition[];
  public emailUnsubscribedListsColumn: SoraxColumnDefinition[];
  public emailHistoryColumn: SoraxColumnDefinition[];

  public listTemplateEmails: EmailTemplateDTO[];
  public listEmailUnsubscribed: EmailSubscriptionDTO[];
  public listEmailHistory: EmailHistoryDTO[];

  public emailUnsubscribeListForm: FormGroup;
  public emailHistoryForm: FormGroup;

  buttonText = "Add to unsubscribe list";

  emailContent: boolean = false;

  private ngUnsubscribe$ = new Subject<void>();

  unsubscribeListResultViewModel: ResultViewModel = new ResultViewModel();
  historyResultViewModel: ResultViewModel = new ResultViewModel();

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private emailSettingService: EmailSettingService,
    private emailTemplateService: EmailTemplateService,
    private emailUnsubscribeService: EmailUnsubscriptionService,
    private emailHistoryService: EmailHistoryService,
    private loader: AppLoaderService,
    private formBuilder: FormBuilder,
    private confirmService: AppConfirmService
  ) {
    super();
  }
  ngOnInit(): void {
    this.initializeColumns();
    this.buildEmailUnsubscribeListForm(new EmailSubscriptionDTO());
    this.buildEmailHistoryForm(new EmailHistoryDTO());
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.getEmailTemplateData();
    } else if (event.index === 2) {
      this.getEmailUnsubscribeData();
    } else if (event.index === 3) {
      this.getEmailHistoryData();
    }
  }

  buildEmailUnsubscribeListForm(emailSubscriptionData: EmailSubscriptionDTO) {
    this.emailUnsubscribeListForm = this.formBuilder.group({
      emailId: [
        emailSubscriptionData.emailId || "",
        [Validators.required, Validators.email],
      ],
    });
  }

  buildEmailHistoryForm(emailHistoryData: EmailHistoryDTO) {
    this.emailHistoryForm = this.formBuilder.group({
      emailSubject: [{ value: emailHistoryData.emailSubject, disabled: true }],
      emailContent: [{ value: emailHistoryData.emailContent, disabled: true }],
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

  filterControl = new FormControl();
  filterText: string;

  applyHistoryFilter() {
    if (this.filterText) {
      this.emailHistoryData = this.listEmailHistory.filter(
        (row) =>
          row.emailSubject.includes(this.filterText) ||
          row.recipients.includes(this.filterText)
      );
    } else {
      this.emailHistoryData = this.listEmailHistory;
    }
  }

  applyUnsubscribedFilter() {
    if (this.filterText) {
      this.emailUnsubscribedListstData = this.listEmailUnsubscribed.filter(
        (row) => row.emailId.includes(this.filterText)
      );
    } else {
      this.emailUnsubscribedListstData = this.listEmailUnsubscribed;
    }
  }

  showEmailContent(data: EmailHistoryDTO) {
    this.emailContent = true;
    this.buildEmailHistoryForm(data);
  }

  close() {
    this.emailContent = false;
  }

  getEmailTemplateData() {
    this.emailTemplateService
      .getEmailTemplates(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        this.listTemplateEmails = response.result;
        this.emailTemplateData = this.listTemplateEmails;
      });
  }

  getEmailHistoryData() {
    this.emailHistoryService
      .getEmailHistoryList(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        Object.assign(this.historyResultViewModel, response);
        Object.assign(this.page, this.historyResultViewModel.page);
        this.listEmailHistory = this.historyResultViewModel.result;
        this.emailHistoryData = this.listEmailHistory;
      });
  }

  getEmailUnsubscribeData() {
    this.emailUnsubscribeService
      .getEmailUnsubscribedList(this.page)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        Object.assign(this.unsubscribeListResultViewModel, response);
        Object.assign(this.page, this.unsubscribeListResultViewModel.page);
        this.listEmailUnsubscribed = this.unsubscribeListResultViewModel.result;
        this.emailUnsubscribedListstData = this.listEmailUnsubscribed;
      });
  }
  committeeExecuteRowActions(rowData: CommitteeMemberDTO) {
    if (rowData.performAction == "edit") {
      // this.openCommitteeMemberPopUp(rowData, false);
    } else {
      console.log("Delete action performed");
    }
  }

  editEmailTemplate(row: any) {
    this.openEmailTemplatePopUp(row, false);
  }

  openEmailTemplatePopUp(data?: EmailTemplateDTO, isNew?: boolean) {
    let title = "Edit email template";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      EmailTemplatePopupComponent,
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
      this.getEmailTemplateData();
    });
  }

  deleteUnsubscribeEmailList(row: any) {
    this.emailUnsubscribeService
      .deleteEmailUnsubscribedList(row)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        if (response.success) {
          this.notificationService.showSuccess(response.messages[0].message);
          this.getEmailUnsubscribeData();
        } else {
          this.notificationService.showError(response.messages[0].message);
        }
      });
  }

  submit() {
    if (this.emailUnsubscribeListForm.valid) {
      const formData = this.emailUnsubscribeListForm.value;
      this.emailUnsubscribeService
        .addEmailToUnsubscribedList(formData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          if (response.success) {
            this.notificationService.showSuccess(response.messages[0].message);
            this.getEmailUnsubscribeData();
          } else {
            this.notificationService.showError(response.messages[0].message);
          }
        });
    } else {
      this.notificationService.showWarning(
        "Please enter a valid email address."
      );
    }
  }

  emailHistorySortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getEmailHistoryData();
  }

  emailUnsubscriptionSortData(sortParameters: Sort) {
    this.page.currentPage = 0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getEmailUnsubscribeData();
  }

  emailHistoryPageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getEmailHistoryData();
  }

  emailUnsubscriptionPageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getEmailUnsubscribeData();
  }

  openSMTPPopUp(data: EmailSettingDTO) {
    let title = "Edit SMTP Email setting";
    this.emailSettingService
      .getEmailSetting()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        let dialogRef: MatDialogRef<any> = this.dialog.open(
          SMTPPopupComponent,
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
        });
      });
  }

  openSendersProfilePopUp(data: EmailSettingDTO) {
    let title = "Edit senders profile setting";
    this.emailSettingService
      .getEmailSetting()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        let dialogRef: MatDialogRef<any> = this.dialog.open(
          EmailSendersProfilePopupComponent,
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
        });
      });
  }

  initializeColumns(): void {
    (this.emailTemplateColumns = [
      {
        name: "Template Name",
        dataKey: "templateName",
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
        name: "Enable Auto Email",
        dataKey: "duration",
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
      (this.emailUnsubscribedListsColumn = [
        {
          name: "Email Id",
          dataKey: "emailId",
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
      (this.emailHistoryColumn = [
        {
          name: "Email Subject",
          dataKey: "emailSubject",
          position: "left",
          isSortable: true,
          link: true,
          clickEvent: (data) => {
            this.showEmailContent(data);
          },
        },
        {
          name: "Email Ids",
          dataKey: "recipients",
          position: "left",
          isSortable: true,
        },
        {
          name: "People",
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
