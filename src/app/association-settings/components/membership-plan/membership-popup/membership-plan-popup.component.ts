import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LookupService } from 'app/common/services/lookup.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import  LableValueModel  from 'app/models/lable-value-model';
import { MemershipPlanModel } from 'app/models/membership-plan-model';
import { map, Observable, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'app-membership-plan-popup',
  templateUrl: './membership-plan-popup.component.html'
})
export class MembershipPlanPopupComponent extends BaseComponent implements OnInit {
  intervaloptionsKey:string = LookupService.MEMBERSHIP_INTERVALS;
  
  subscription: Subscription;
  public membershipPlanForm: FormGroup;
  public intervals: LableValueModel[]=[];
  public isLoading:boolean;
  public noResults:boolean;
  filteredIntervals$: Observable<LableValueModel[]>;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembershipPlanPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.buildMembershipPlanForm(this.data.payload);
  }

  buildMembershipPlanForm(planData: MemershipPlanModel) {
    this.membershipPlanForm = this.formBuilder.group({
      planName: this.formBuilder.control(planData.description || '', [Validators.required]),
      description: this.formBuilder.control(planData.description || '', [Validators.required]),
      fee: this.formBuilder.control(planData.fee || '', [Validators.required]),
      interval: this.formBuilder.control('OneTimeID',),
      intervalAutoLabel: this.formBuilder.control('',),
      familyMemberIncluded: this.formBuilder.control(planData.familyMemberIncluded || false, [Validators.required]),
      autoPymtRemainder: this.formBuilder.control(true, [Validators.required]),
      availableForGeneralPublic: this.formBuilder.control(planData.availableForGeneralPublic || false, [Validators.required]),
      sendEmailNotification: this.formBuilder.control(planData.sendEmailNotification || false, [Validators.required]),
      benefits: this.formBuilder.control(planData.benefits || '', [Validators.required]),
      status: this.formBuilder.control(planData.status || '', [Validators.required]),
    })
  }

  submit() {
    this.dialogRef.close(this.membershipPlanForm.value)
  }

  
  onSelectedOption(option: LableValueModel) {
    console.log("selected OptionId:::"+option.id);
    console.log("selected Option:::"+option.name);
    this.membershipPlanForm.controls['interval'].setValue(option.id);
   this.membershipPlanForm.controls['intervalAutoLabel'].setValue(option.name);
    
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
