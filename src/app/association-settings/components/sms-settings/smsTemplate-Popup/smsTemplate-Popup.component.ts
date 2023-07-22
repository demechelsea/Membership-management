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
import { NotificationService } from "app/common/services/notification.service";
import { MessageTemplateDTO } from "app/models/messageTemplateDTO";
import { SmsTemplateService } from "app/association-settings/services/smsTemplate/smsTemplate.service";

@Component({
  selector: "app-component-popup",
  templateUrl: "./smsTemplate-Popup.component.html",
})
export class SMSTemplatePopupComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  public sendersProfileForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SMSTemplatePopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public smsTemplateService: SmsTemplateService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = "Update senders profile";
  }

  ngOnInit() {
    this.buildSMTPForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildSMTPForm(SMSSettingDTO: MessageTemplateDTO) {
    this.sendersProfileForm = this.formBuilder.group({
      id: [SMSSettingDTO.id, Validators.required],
      name: [SMSSettingDTO.name, Validators.required],
      subject: [SMSSettingDTO.subject, Validators.required],
      content: [SMSSettingDTO.content, Validators.required],
      placeHolders: [SMSSettingDTO.placeHolders, Validators.required],
      enableAutoFlg: [
        this.convertToNumber(SMSSettingDTO.enableAutoFlg) || false,
        Validators.required,
      ],
    });
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  submit(plan: MessageTemplateDTO) {
    plan.enableAutoFlg = plan.enableAutoFlg ? "Y" : "N"
    if (this.sendersProfileForm.valid) {
      this.smsTemplateService
        .updateSmsTemplates(plan)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          if (response.success) {
            this.notificationService.showSuccess(response.messages[0].message);
            this.dialogRef.close(response);
          } else {
            this.notificationService.showError(response.messages[0].message);
          }
        });
    } else {
      alert("Please fill in all the required fields.");
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
