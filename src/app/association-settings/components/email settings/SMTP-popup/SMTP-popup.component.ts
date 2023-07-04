import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'app/core/components/base/base.component';
import LableValueModel from 'app/models/lable-value-model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { EmailSettingDTO } from 'app/models/emailSettingDTO';
import { EmailSettingService } from 'app/association-settings/services/emailSettingService/emailSetting.service';



@Component({
  selector: 'app-component-popup',
  templateUrl: './SMTP-popup.component.html',

})
export class SMTPPopupComponent extends BaseComponent implements OnInit {

  private ngUnsubscribe$ = new Subject<void>();
  public SMTPForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = 'Create a SMTP Email setting';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SMTPPopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private confirmService: AppConfirmService,
    public emailSettingService: EmailSettingService
  ) {
    super();
    this.buttonText = 'Update SMTP Email setting';
    console.log("bui" , data);
    
  }

  ngOnInit() {
    this.buildSMTPForm(this.data.payload.result);
    this.cdRef.detectChanges();
  }

  buildSMTPForm(emailSettingdata: EmailSettingDTO) {
    const isUpdate = !this.data.isNew;
    this.SMTPForm = this.formBuilder.group({
      id: [emailSettingdata.id, Validators.required],
      smtpHost: [emailSettingdata.smtpHost, Validators.required],
      port: [emailSettingdata.port, Validators.required],
      replyToEmail: [emailSettingdata.replyToEmail, Validators.required],
      emailId: [emailSettingdata.emailId, Validators.required],
      password: [emailSettingdata.password, Validators.required],
    })
  }


  submit(emailSetting: EmailSettingDTO) {
    if (this.SMTPForm.valid) {
      this.emailSettingService.updateEmailSetting(emailSetting.id, emailSetting)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(
          response => this.dialogRef.close(response),
          error => {
            console.error('Failed to update an existing plan:', error);
            alert('Something went wrong. Please try again later.');
          }
        );
    } else {
      alert('Please fill in all the required fields.');
    }
  }



  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
