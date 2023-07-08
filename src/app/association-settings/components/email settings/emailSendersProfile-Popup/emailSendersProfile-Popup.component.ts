import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'app/core/components/base/base.component';
import LableValueModel from 'app/models/lable-value-model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { EmailSettingDTO } from 'app/models/emailSettingDTO';
import { EmailSettingService } from 'app/association-settings/services/emailSettingService/emailSetting.service';
import { NotificationService } from 'app/common/services/notification.service';



@Component({
  selector: 'app-component-popup',
  templateUrl: './emailSendersProfile-Popup.component.html',

})
export class EmailSendersProfilePopupComponent extends BaseComponent implements OnInit {

  private ngUnsubscribe$ = new Subject<void>();
  public sendersProfileForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = 'Create a SMTP Email setting';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmailSendersProfilePopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public emailSettingService: EmailSettingService,
    private notificationService: NotificationService

  ) {
    super();
    this.buttonText = 'Update senders profile';
  }

  ngOnInit() {
    this.buildSMTPForm(this.data.payload.result);
    this.cdRef.detectChanges();
  }

  buildSMTPForm(EmailSettingDTO: EmailSettingDTO) {
    const isUpdate = !this.data.isNew;
    this.sendersProfileForm = this.formBuilder.group({
      id: [EmailSettingDTO.id, Validators.required],
      smtpHost: [EmailSettingDTO.smtpHost, Validators.required],
      replyToEmail: [EmailSettingDTO.replyToEmail, Validators.required],
      signiture: [EmailSettingDTO.signiture, Validators.required],
      emailId: [EmailSettingDTO.emailId, Validators.required],
      password: [EmailSettingDTO.password, Validators.required],
      port: [EmailSettingDTO.port, Validators.required],

    })
  }


  submit(plan: EmailSettingDTO) {
    if (this.sendersProfileForm.valid) {
      this.emailSettingService.updateEmailSetting(plan.id, plan)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(response =>{
          if (response.success) {
            this.notificationService.showSuccess(response.messages[0].message);
            this.dialogRef.close(response);
          }
          else {
            this.notificationService.showError(response.messages[0].message);
          }
        });
    } else {
      alert('Please fill in all the required fields.');
    }
  }



  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
