import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { NotificationService } from "app/common/services/notification.service";
import { MycompanyService } from "app/membership-management/services/my-companies-service/my-companies.service";
import { UserEducationDTO } from "app/models/UserEducationDTO";
import { UserWorkExperienceDTO } from "app/models/UserWorkExperienceDTO";

@Component({
  selector: "work-experience-popup",
  templateUrl: "./work-experience-popup.component.html",
  styleUrls: ["./work-experience-popup.component.scss"],
})
export class WorkExperiencePopupComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  public isLoading: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;
  selectedAssociationMemberId: number;

  public workExperienceForm: FormGroup;

  buttonText: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<WorkExperiencePopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private userCompaniesService: MycompanyService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew ? "Add work experience" : "Update work experience";
    this.selectedAssociationMemberId = data.selectedAssociationMemberId;
  }

  ngOnInit() {
    this.buildWorkExperienceForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildWorkExperienceForm(educationData: UserWorkExperienceDTO) {
    const isUpdate = !this.data.isNew;
    this.workExperienceForm = this.formBuilder.group({
      userDetailId: [isUpdate ? this.selectedAssociationMemberId : null],
      startDate: [educationData?.startDate || ""],
      endDate: [educationData?.endDate || ""],
      jobTitle: [educationData?.jobTitle || ""],
      companyName: [educationData?.companyName || ""],
      responsibilities: [educationData?.responsibilities || ""],
    });
  }

  submit(addressDetails: UserEducationDTO) {
    if (this.workExperienceForm.valid) {
      const formData = this.workExperienceForm.value;
      if (this.data.isNew) {
        this.userCompaniesService
          .createCompanies(formData)
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
        this.userCompaniesService
          .updateCompanies(formData)
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

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
