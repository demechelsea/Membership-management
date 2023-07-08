import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'app/core/components/base/base.component';
import LableValueModel from 'app/models/lable-value-model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { EmailSettingDTO } from 'app/models/emailSettingDTO';
import { MessageSettingDTO } from 'app/models/messageSettingDTO';
import { SmsSettingService } from 'app/association-settings/services/smsSettingService/smsSetting.service';
import { NotificationService } from 'app/common/services/notification.service';



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

  buttonText = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SMSSenderProfilePopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private confirmService: AppConfirmService,
    public SmsSettingService: SmsSettingService,
    private notificationService: NotificationService

  ) {
    super();
    this.buttonText = 'Update SMS senders profile';
    console.log("buiz" , data);
  }

  ngOnInit() {
    this.buildSMTPForm(this.data.payload.result);
    this.cdRef.detectChanges();
  }

  buildSMTPForm(SMSSettingDTO: MessageSettingDTO) {
    const isUpdate = !this.data.isNew;
    this.SMSsendersProfileForm = this.formBuilder.group({
      id: [SMSSettingDTO.id, Validators.required],
      smsName: [SMSSettingDTO.smsName, Validators.required],
      smsIdentify: [SMSSettingDTO.smsIdentify, Validators.required],
    })
  }


  submit(emailSetting: MessageSettingDTO) {
    if (this.SMSsendersProfileForm.valid) {
      this.SmsSettingService.updateSmsSetting(emailSetting.id, emailSetting)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(
          response => {
            if (response.success) {
              this.notificationService.showSuccess(response.messages[0].message);
              this.dialogRef.close(response);
            }
            else {
              this.notificationService.showError(response.messages[0].message);
            }
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
