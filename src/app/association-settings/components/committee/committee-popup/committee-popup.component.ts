import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, Subscription, map, takeUntil } from "rxjs";
import committeeDTO from "app/models/committeeDTO";
import { CommitteeService } from "app/association-settings/services/committee-service/committee.service";
import * as moment from "moment";
import { NotificationService } from "app/common/services/notification.service";
import { MatDatepicker } from "@angular/material/datepicker";
import { VALIDATION_MESSAGES } from "app/common/utils/sorax-validators";

export const dateRangeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const startDate = control.get("startDate");
  const endDate = control.get("endDate");
  const status = control.get("status");

  if (startDate && startDate.value && endDate && endDate.value) {
    const formattedEndDate = moment(endDate.value).format("YYYY-MM-DD");
    const formattedStartDate = moment(startDate.value).format("YYYY-MM-DD");

    return formattedStartDate > formattedEndDate ? { dateRange: true } : null;
  } else if (endDate && endDate.value) {
    return { dateRange: true };
  }

  return null;
};

@Component({
  selector: "committee-component-popup",
  templateUrl: "./committee-popup.component.html",
})
export class CommitteePopupComponent extends BaseComponent implements OnInit {
  statusoptionsKey: string = LookupService.STATUS_OPTIONS;
  dateRangeErrorMessage = VALIDATION_MESSAGES.dateRange;
  numberError = VALIDATION_MESSAGES.number;

  private ngUnsubscribe$ = new Subject<void>();
  public committeeForm: FormGroup;
  public intervals: LableValueModel[] = [];
  public isLoading: boolean;
  public noResults: boolean;

  @ViewChild("startDatePicker") startDatePicker: MatDatepicker<Date>;
  @ViewChild("endDatePicker") endDatePicker: MatDatepicker<Date>;

  buttonText = "Create a committee";
  minEndDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CommitteePopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private committeeService: CommitteeService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew ? "Create a committee" : "Update committee";
  }

  ngOnInit() {
    this.buildCommitteeForm(this.data.payload);
    this.cdRef.detectChanges();

    this.committeeForm.get("status").valueChanges.subscribe((status) => {
      const endDateControl = this.committeeForm.get("endDate");
      if (status === "active") {
        endDateControl.setValue(null);
        endDateControl.clearValidators();
      }
      endDateControl.updateValueAndValidity();
    });
  }

  buildCommitteeForm(committeeData: committeeDTO) {
    const isUpdate = !this.data.isNew;
    this.committeeForm = this.formBuilder.group(
      {
        id: [
          isUpdate ? committeeData.id : null,
          isUpdate ? Validators.required : [],
        ],
        startDate: [
          isUpdate ? moment(committeeData.startDate).format("YYYY-MM-DD") : "",
          Validators.required,
        ],
        endDate: [
          committeeData.endDate != null
            ? moment(committeeData?.endDate).format("YYYY-MM-DD")
            : null,
          isUpdate && committeeData.status === "Inactive"
            ? Validators.required
            : null,
        ],

        teamSize: [
          committeeData.teamSize || "",
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern("^[0-9]*$"),
          ],
        ],
        name: [committeeData.name || "", Validators.required],
        status: [
          committeeData.status || "active",
          isUpdate ? Validators.required : [],
        ],
      },
      { validators: dateRangeValidator }
    );

    this.committeeForm.get("startDate").valueChanges.subscribe((startDate) => {
      this.minEndDate = startDate;
    });
  }

  submit(committee: committeeDTO) {
    if (this.committeeForm.valid) {
      const formData = this.committeeForm.value;
      if (this.data.isNew) {
        this.committeeService
          .createCommittee(formData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe((response) => {
            if (response.success) {
              this.notificationService.showSuccess(
                response.messages[0].message
              );
              this.dialogRef.close(response);
            } else {
              this.notificationService.showError(response.messages[0].message);
            }
          });
      } else {
        this.committeeService
          .updateCommittee(committee.id, formData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe((response) => {
            if (response.success) {
              this.notificationService.showSuccess(
                response.messages[0].message
              );
              this.dialogRef.close(response);
            } else {
              this.notificationService.showError(response.messages[0].message);
            }
          });
      }
    } else {
      this.notificationService.showWarning(
        "Please fill in all the required fields."
      );
    }
  }

  onSelectedIntervalOption(option: LableValueModel) {
    this.committeeForm.controls["interval"].setValue(option.name);
  }

  onSelectedStatusOption(option: LableValueModel) {
    this.committeeForm.controls["status"].setValue(option.name);
    if (option.name === "active") {
      this.committeeForm.controls["endDate"].clearValidators();
    } else {
      this.committeeForm.controls["endDate"].setValidators(Validators.required);
    }
    this.committeeForm.controls["endDate"].updateValueAndValidity();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
