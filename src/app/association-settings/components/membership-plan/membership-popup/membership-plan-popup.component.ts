import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LookupService } from 'app/common/services/lookup.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { LableValueModel } from 'app/models/lable-value-model';
import { MemershipPlanModel } from 'app/models/membership-plan-model';
import { map, Observable, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'app-membership-plan-popup',
  templateUrl: './membership-plan-popup.component.html'
})
export class MembershipPlanPopupComponent extends BaseComponent implements OnInit {
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

    this.initIntervals('')

    this.filteredIntervals$ = this.membershipPlanForm.get('interval').valueChanges.pipe(
       startWith(''),
       map(value => this.filterIntervals(value ||'')),
     );
  }

  buildMembershipPlanForm(planData: MemershipPlanModel) {
    this.membershipPlanForm = this.formBuilder.group({
      planName: this.formBuilder.control(planData.description || '', [Validators.required]),
      description: this.formBuilder.control(planData.description || '', [Validators.required]),
      fee: this.formBuilder.control(planData.fee || '', [Validators.required]),
      interval: this.formBuilder.control(planData.interval || '', [Validators.required]),
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

  initIntervals(value:any) {
    this.subscription = this.lookupService.retrieveIntervals(value).subscribe(
      (response) => {
        Object.assign(this.intervals, response.result);
      }
    );
  }

  filterIntervals(value:any) {
    const filterValue = value.toLowerCase();
    return this.intervals.filter(option => option.name.toLowerCase().includes(filterValue));

  }


  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
