import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { EmailSettingService } from "app/association-settings/services/emailSettingService/emailSetting.service";
import moment from "moment";
import { EmailHistoryDTO } from "app/models/emailHistoryDTO";
import { log } from "console";
import { DatePipe } from "@angular/common";

@Component({
  selector: "email-history-popup",
  templateUrl: "./email-history-popup.component.html",
})
export class EmailHistoryPopupComponent
  extends BaseComponent
  implements OnInit
{
  private ngUnsubscribe$ = new Subject<void>();
  public emailHistoryForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmailHistoryPopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public emailSettingService: EmailSettingService,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngOnInit() {
    this.buildEmailHistory(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildEmailHistory(emailHistoryData: EmailHistoryDTO) {
    this.emailHistoryForm = this.formBuilder.group({
      from: [emailHistoryData.from],
      emailSubject: [emailHistoryData.emailSubject],
      emailContent: [emailHistoryData.emailContent],
      recipients: [emailHistoryData.recipients],
      modifiedTimestamp: [
        this.datePipe.transform(emailHistoryData.modifiedTimestamp, 'yyyy-MM-dd')
      ],
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
