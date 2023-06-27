import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LookupService } from 'app/common/services/lookup.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import LableValueModel from 'app/models/lable-value-model';
import { Observable, Subject, Subscription, map, takeUntil } from 'rxjs';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import committeeDTO from 'app/models/committeeDTO';
import { CommitteeService } from 'app/association-settings/services/committee-service/committee.service';
import * as moment from 'moment';


@Component({
  selector: 'committee-component-popup',
  templateUrl: './committee-popup.component.html',

})
export class CommitteePopupComponent extends BaseComponent implements OnInit {

  
  statusoptionsKey: string = LookupService.STATUS_OPTIONS;

  private ngUnsubscribe$ = new Subject<void>();
  public committeeForm: FormGroup;
  public intervals: LableValueModel[] = [];
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = 'Create a committee';
  minEndDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CommitteePopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private committeeService: CommitteeService,
    private localStorageService: LocalstorageService
  ) {
    super();
    this.buttonText = data.isNew ? 'Create a committee' : 'Update committee';

  }


  ngOnInit() {
    this.buildCommitteeForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildCommitteeForm(committeeData: committeeDTO) {
    const isUpdate = !this.data.isNew;
    this.committeeForm = this.formBuilder.group({
      id: [isUpdate ? committeeData.id : null, isUpdate ? Validators.required : []],
      startDate: [isUpdate ? moment(committeeData.startDate).format('YYYY-MM-DD') : '', Validators.required],
      endDate: [isUpdate ? moment(committeeData.endDate).format('YYYY-MM-DD') : '', Validators.required],
      teamSize: [committeeData.teamSize || '', Validators.required],
      name: [committeeData.name || '', Validators.required],
      status: [committeeData.status || 'active', isUpdate ? Validators.required : []],
    });
  
    this.committeeForm.get('startDate').valueChanges.subscribe(startDate => {
      this.minEndDate = startDate;
    });
  }
  

  submit(committee: committeeDTO) {
    console.log('committee object:', committee);
    if (this.committeeForm.valid) {
      const formData = this.committeeForm.value;
      if (this.data.isNew) {
        this.committeeService.createCommittee(formData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(response => {
            this.dialogRef.close(response);
          }, error => {
            console.error('Failed to create a new committee:', error);
            alert('Something went wrong. Please try again later.');
          });
      } else {
        this.committeeService.updateCommittee(committee.id, formData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(response => {
            console.log('Updated an existing committee:', response);
            this.dialogRef.close(response);
          }, error => {
            console.error('Failed to update an existing committee:', error);
            alert('Something went wrong. Please try again later.');
          });
      }
    } else {
      alert('Please fill in all the required fields.');
    }
  }

  onSelectedIntervalOption(option: LableValueModel) {
    this.committeeForm.controls['interval'].setValue(option.name);
  }

  onSelectedStatusOption(option: LableValueModel) {
    this.committeeForm.controls['status'].setValue(option.name);
  }


  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
