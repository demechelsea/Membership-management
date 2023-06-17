import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'app/core/components/base/base.component';
import LableValueModel from 'app/models/lable-value-model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PositionService } from 'app/association-settings/services/position-service/position.service';
import { CommitteePositionDTO } from 'app/models/committeePositionDTO';
import CommitteeDTO from 'app/models/committeeDTO';
import { AppConfirmService } from 'app/common/services/app-confirm.service';



@Component({
  selector: 'app-component-popup',
  templateUrl: './position-popup.component.html',

})
export class PositionPopupComponent extends BaseComponent implements OnInit {

  private ngUnsubscribe$ = new Subject<void>();
  public positionForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = 'Create a position';
  id: number;

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PositionPopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private positionService: PositionService,
    private confirmService: AppConfirmService,
  ) {
    super();
    this.buttonText = data.isNew ? 'Create a position' : 'Update position';
    this.id = data.id;
  }

  ngOnInit() {
    this.buildpositionForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildpositionForm(planData: CommitteePositionDTO) {
    planData.committee = new CommitteeDTO();
    planData.committee.id = this.id;
    const isUpdate = !this.data.isNew;
    this.positionForm = this.formBuilder.group({
      id: [isUpdate ? planData.id : null, isUpdate ? Validators.required : []],
      positionName: [planData.positionName || '', Validators.required],
      positionRank: [planData.positionRank || null, Validators.required],
      committee:[planData.committee || '']
    })
  }


  submit(plan: CommitteePositionDTO) {
    if (this.positionForm.valid) {
      const formData = this.positionForm.value;
      if (!this.data.isNew) {
        // Show confirmation dialog before updating position
        this.confirmService.confirm({ message: `Members will be affected by editing. Are you sure you want to update this position?` })
          .subscribe((result) => {
            if (result) {
              // User confirmed, update position
              this.positionService.updatePosition(plan.id, formData)
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(response => {
                  this.dialogRef.close(response);
                }, error => {
                  console.error('Failed to update an existing plan:', error);
                  alert('Something went wrong. Please try again later.');
                });
            }
          });
      } else {
        // Create new position
        this.positionService.createPosition(formData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(response => {
            this.dialogRef.close(response);
          }, error => {
            console.error('Failed to create a new plan:', error);
            alert('Something went wrong. Please try again later.');
          });
      }
    } else {
      alert('Please fill in all the required fields.');
    }
  }
  

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
