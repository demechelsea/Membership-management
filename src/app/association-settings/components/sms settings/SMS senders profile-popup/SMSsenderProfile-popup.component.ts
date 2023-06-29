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
  templateUrl: './SMSsenderProfile-popup.component.html',

})
export class SMSSenderProfilePopupComponent extends BaseComponent implements OnInit {

  private ngUnsubscribe$ = new Subject<void>();
  public SMSsendersProfileForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = 'Create SMS senders profile';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SMSSenderProfilePopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private confirmService: AppConfirmService,
    public emailSettingService: EmailSettingService
  ) {
    super();
    this.buttonText = 'Update SMS senders profile';
  }

  ngOnInit() {
    this.buildSMTPForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildSMTPForm(EmailSettingDTO: EmailSettingDTO) {
    const isUpdate = !this.data.isNew;
    this.SMSsendersProfileForm = this.formBuilder.group({
      id: [EmailSettingDTO.id, Validators.required],
      smtpHost: [EmailSettingDTO.smtpHost, Validators.required],
      port: [EmailSettingDTO.port, Validators.required],

    })
  }


  submit(plan: EmailSettingDTO) {
    if (this.SMSsendersProfileForm.valid) {
      this.emailSettingService.updateEmailSetting(plan.id, plan)
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
