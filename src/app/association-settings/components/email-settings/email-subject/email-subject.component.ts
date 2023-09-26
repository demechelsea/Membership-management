import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { EmailSettingDTO } from "app/models/emailSettingDTO";
import { EmailSettingService } from "app/association-settings/services/emailSettingService/emailSetting.service";
import { NotificationService } from "app/common/services/notification.service";
import moment from "moment";
import { EmailHistoryDTO } from "app/models/emailHistoryDTO";

@Component({
  selector: "email-subject-popup",
  templateUrl: "./email-subject.component.html",
})
export class EmailSubjectPopupComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  public emailSubjectForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = "Create a SMTP Email setting";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmailSubjectPopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public emailSettingService: EmailSettingService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = "Update SMTP Email setting";
  }

  ngOnInit() {
    this.buildEmailSubject(this.data.payload.result);
    this.cdRef.detectChanges();
  }

  buildEmailSubject(emailSubjectData: EmailHistoryDTO) {
    const isUpdate = !this.data.isNew;
    this.emailSubjectForm = this.formBuilder.group({
      emailSubject: [{ value: emailSubjectData.emailSubject, disabled: true }],
      emailContent: [{ value: emailSubjectData.emailContent, disabled: true }],
      recipients: [{ value: emailSubjectData.recipients, disabled: true }],
      modifiedTimestamp: [
        {
          value: moment(emailSubjectData.modifiedTimestamp).format(
            "YYYY-MM-DD"
          ),
          disabled: true,
        },
      ],
    });
  }


  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
