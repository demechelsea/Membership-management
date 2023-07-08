import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LookupService } from 'app/common/services/lookup.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import LableValueModel from 'app/models/lable-value-model';
import MemershipPlanModel from 'app/models/membershipPlanModel';
import { Observable, Subject, Subscription, map, takeUntil } from 'rxjs';
import { MembershipPlanService } from '../../../services/membership-plan-service/membership-plan.service';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import { NotificationService } from 'app/common/services/notification.service';



@Component({
  selector: 'app-membership-plan-popup',
  templateUrl: './membership-plan-popup.component.html',

})
export class MembershipPlanPopupComponent extends BaseComponent implements OnInit {
  intervaloptionsKey: string = LookupService.MEMBERSHIP_INTERVALS;
  statusoptionsKey: string = LookupService.STATUS_OPTIONS;

  private ngUnsubscribe$ = new Subject<void>();
  public membershipPlanForm: FormGroup;
  public intervals: LableValueModel[] = [];
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = 'Create a plan';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembershipPlanPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private membershipPlanService: MembershipPlanService,
    private localStorageService: LocalstorageService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew ? 'Create a plan' : 'Update plan';

  }

  ngOnInit() {
    this.buildMembershipPlanForm(this.data.payload);

    if (!this.data.isNew) {
      this.membershipPlanForm.controls['fee'].disable();
      this.membershipPlanForm.controls['interval'].disable();
    }

    this.cdRef.detectChanges();
  }

  buildMembershipPlanForm(planData: MemershipPlanModel) {
    const isUpdate = !this.data.isNew;
    this.membershipPlanForm = this.formBuilder.group({
      id: [isUpdate ? planData.id : null, isUpdate ? Validators.required : []],
      planName: [planData.planName || '', Validators.required],
      description: [planData.description || '', Validators.required],
      fee: [planData.fee || '', Validators.required],
      interval: [planData.interval || '', Validators.required],
      familyMemberIncluded: [this.convertToNumber(planData.familyMemberIncluded) || 0, Validators.required],
      autoPymtRemainder: [this.convertToNumber(planData.autoPymtRemainder) || 0, Validators.required],
      availableForGeneralPublic: [this.convertToNumber(planData.availableForGeneralPublic) || 0, Validators.required],
      sendEmailNotification: [this.convertToNumber(planData.sendEmailNotification) || 0, Validators.required],
      authApproveSubscribers: [this.convertToNumber(planData.authApproveSubscribers) || 0, Validators.required],
      benefits: [planData.benefits || '', Validators.required],
      status: [planData.status || '', isUpdate ? Validators.required : []],
      notifySubscribers: [this.convertToNumber(planData.notifySubscribers) || 0, isUpdate ? Validators.required : []],
      modifiedTimestamp: ['',],
      modifiedUser: ['',],
    })
  }


  submit(plan: MemershipPlanModel) {
    plan.createdUser = this.localStorageService.getLoggedInUser().emailId;
    if (this.membershipPlanForm.valid) {
      const formData = this.membershipPlanForm.value;
      const planData = this.mapFormDataToPlanData(formData);
      if (this.data.isNew) {
        this.membershipPlanService.createPlan(planData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(response => {
            if (response.success) {
              this.notificationService.showSuccess(response.messages[0].message);
              this.dialogRef.close(response);
            }
            else {
                this.notificationService.showError(response.messages[0].message);
            }
          },);
      } else {
        this.membershipPlanService.updatePlan(plan.id, planData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(response => {
            if (response.success) {
              this.notificationService.showSuccess(response.messages[0].message);
              this.dialogRef.close(response);
            }
            else {
              this.notificationService.showError(response.messages[0].message);
            }
          });
      }
    } else {
      this.notificationService.showWarning('Please fill in all the required fields.');
    }
  }




  // Define a function that maps the form value to a new object that matches the plan model
  mapFormDataToPlanData(formData: any): MemershipPlanModel {
    return {
      ...formData,
      familyMemberIncluded: formData.familyMemberIncluded ? "Y" : "N",
      autoPymtRemainder: formData.autoPymtRemainder ? "Y" : "N",
      availableForGeneralPublic: formData.availableForGeneralPublic ? "Y" : "N",
      sendEmailNotification: formData.sendEmailNotification ? "Y" : "N",
      notifySubscribers: formData.notifySubscribers ? "Y" : "N",
      authApproveSubscribers: formData.authApproveSubscribers ? "Y" : "N",
    };
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  onSelectedIntervalOption(option: LableValueModel) {
    this.membershipPlanForm.controls['interval'].setValue(option.name);
  }

  onSelectedStatusOption(option: LableValueModel) {
    this.membershipPlanForm.controls['status'].setValue(option.name);
  }


  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }



}
