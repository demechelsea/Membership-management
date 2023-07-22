import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { NotificationService } from "app/common/services/notification.service";
import { EmailTemplateDTO } from "app/models/emailTemplateDTO";
import { EmailTemplateService } from "app/association-settings/services/emailTemplate/emailTemplate.service";

@Component({
  selector: "app-component-popup",
  templateUrl: "./emailTemplate-Popup.component.html",
})
export class EmailTemplatePopupComponent
  extends BaseComponent
  implements OnInit
{
  private ngUnsubscribe$ = new Subject<void>();
  public sendersProfileForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = "Create a SMTP Email setting";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmailTemplatePopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public emailTemplateService: EmailTemplateService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = "Update senders profile";
  }

  ngOnInit() {
    this.buildSMTPForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildSMTPForm(EmailSettingDTO: EmailTemplateDTO) {
    this.sendersProfileForm = this.formBuilder.group({
      id: [EmailSettingDTO.id, Validators.required],
      templateName: [EmailSettingDTO.templateName, Validators.required],
      subject: [EmailSettingDTO.subject, Validators.required],
      content: [EmailSettingDTO.content, Validators.required],
      placeHolders: [EmailSettingDTO.placeHolders, Validators.required],
    });
  }

  submit(plan: EmailTemplateDTO) {
    if (this.sendersProfileForm.valid) {
      this.emailTemplateService
        .updateEmailTemplates(plan)
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
