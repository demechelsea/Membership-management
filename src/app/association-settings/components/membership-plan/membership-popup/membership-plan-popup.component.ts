import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LookupService } from 'app/common/services/lookup.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import LableValueModel from 'app/models/lable-value-model';
import MemershipPlanModel from 'app/models/membership-plan-model';
import { Observable, Subject, Subscription } from 'rxjs';
import { MembershipPlanService } from '../../../services/membership-plan.service';


@Component({
  selector: 'app-membership-plan-popup',
  templateUrl: './membership-plan-popup.component.html'
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
    private membershipPlanService: MembershipPlanService
  ) {
    super();
    this.buttonText = data.isNew ? 'Create a plan' : 'Update plan';
  }

  ngOnInit() {
    this.buildMembershipPlanForm(this.data.payload);

    if (!this.data.isNew) {
      this.membershipPlanForm.controls['fee'].disable();
      this.membershipPlanForm.controls['interval'].disable();
      this.membershipPlanForm.controls['intervalAutoLabel'].disable();
    }

    this.cdRef.detectChanges();
  }

  buildMembershipPlanForm(planData: MemershipPlanModel) {
    this.membershipPlanForm = this.formBuilder.group({
      planName: this.formBuilder.control(planData.planName || '', [Validators.required]),
      description: this.formBuilder.control(planData.description || '', [Validators.required]),
      fee: this.formBuilder.control(planData.fee || '', [Validators.required]),
      interval: this.formBuilder.control('OneTimeID',),
      intervalAutoLabel: this.formBuilder.control('',),
      familyMemberIncluded: this.formBuilder.control(planData.familyMemberIncluded || false, [Validators.required]),
      autoPymtRemainder: this.formBuilder.control(true, [Validators.required]),
      availableForGeneralPublic: this.formBuilder.control(planData.availableForGeneralPublic || false, [Validators.required]),
      sendEmailNotification: this.formBuilder.control(planData.sendEmailNotification || false, [Validators.required]),
      autoApproveApplicants: this.formBuilder.control(planData.autoApproveApplicants || false, [Validators.required]),
      benefits: this.formBuilder.control(planData.benefits || '', [Validators.required]),
      status: this.formBuilder.control(planData.status || '', [Validators.required]),
      statusAutoLabel: this.formBuilder.control(''),
      notifySubscribers: this.formBuilder.control('', [Validators.required])
    })
  }

  submit(plan: MemershipPlanModel) {
    // Check if the form is valid
    
    console.log(this.membershipPlanForm.invalid);
    console.log(this.membershipPlanForm.errors);

    if (true) {
      // Get the form value
      const plan = this.membershipPlanForm.value;
      // Check if it is a new plan or an existing one
      alert(this.data.isNew)
      if (this.data.isNew) {
        alert(plan.planName)
        // Call the service to create a new plan
        this.membershipPlanService.createPlan(plan).subscribe(response => {
          // Handle the response from the service
          console.log('Created a new plan:', response);
          // Close the dialog and return the response
          this.dialogRef.close(response);
        }, error => {
          // Handle the error from the service
          console.error('Failed to create a new plan:', error);
          // Show an error message to the user
          alert('Something went wrong. Please try again later.');
        });
      } else {
        // Call the service to update an existing plan
        this.membershipPlanService.updatePlan(plan.id, plan).subscribe(response => {
          // Handle the response from the service
          console.log('Updated an existing plan:', response);
          // Close the dialog and return the response
          this.dialogRef.close(response);
        }, error => {
          // Handle the error from the service
          console.error('Failed to update an existing plan:', error);
          // Show an error message to the user
          alert('Something went wrong. Please try again later.');
        });
      }
    } else {
      // Show a validation message to the user
      alert('Please fill in all the required fields.');
    }
    
  }
  
  // Delete a plan
  deletePlan(id: string) {
    // Call the service to delete a plan
    this.membershipPlanService.deletePlan(id).subscribe(response => {
      // Handle the response from the service
      console.log('Deleted a plan:', response);
      // Show a success message to the user
      alert('The plan has been deleted successfully.');
    }, error => {
      // Handle the error from the service
      console.error('Failed to delete a plan:', error);
      // Show an error message to the user
      alert('Something went wrong. Please try again later.');
    });
  }
  


  onSelectedOption(option: LableValueModel) {
    this.membershipPlanForm.controls['interval'].setValue(option.id);
    this.membershipPlanForm.controls['intervalAutoLabel'].setValue(option.name);

  }

  onSelectedStatusOption(option: LableValueModel) {
    this.membershipPlanForm.controls['status'].setValue(option.id);
    this.membershipPlanForm.controls['statusAutoLabel'].setValue(option.name);
  }


  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


}
