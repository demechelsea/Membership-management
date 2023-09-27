import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { EmailSettingService } from "app/association-settings/services/emailSettingService/emailSetting.service";
import { DatePipe } from "@angular/common";
import { MessageHistoryDTO } from "app/models/messageHistoryDTO";

@Component({
  selector: "sms-history-popup",
  templateUrl: "./sms-history-popup.component.html",
})
export class SMSHistoryPopupComponent
  extends BaseComponent
  implements OnInit
{
  private ngUnsubscribe$ = new Subject<void>();
  public smsHistoryForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SMSHistoryPopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public emailSettingService: EmailSettingService,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngOnInit() {
    this.buildEmailSubject(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildEmailSubject(smsHistoryData: MessageHistoryDTO) {
    this.smsHistoryForm = this.formBuilder.group({
      from: [smsHistoryData.from],
      msgSubject: [smsHistoryData.msgSubject],
      msgContent: [smsHistoryData.msgContent],
      recipients: [smsHistoryData.recipients],
      modifiedTimestamp: [
        this.datePipe.transform(smsHistoryData.modifiedTimestamp, 'yyyy-MM-dd')
      ],
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
