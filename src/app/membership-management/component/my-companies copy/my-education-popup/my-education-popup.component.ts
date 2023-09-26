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

@Component({
  selector: "my-education-popup",
  templateUrl: "./my-education-popup.component.html",
  styleUrls: ["./my-education-popup.component.scss"],
})
export class MyEducationPopupComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  public isLoading: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;
  selectedAssociationMemberId: number;

  public userEducationForm: FormGroup;

  buttonText: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MyEducationPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private userCompaniesService: MycompanyService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew ? "Add education" : "Update education";
    this.selectedAssociationMemberId = data.selectedAssociationMemberId;
  }

  ngOnInit() {
    this.buildAssociationMemberForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildAssociationMemberForm(educationData: UserEducationDTO) {
    const isUpdate = !this.data.isNew;
    this.userEducationForm = this.formBuilder.group({
      userDetailId: [isUpdate ? this.selectedAssociationMemberId : null],
      graduationDate: [educationData?.graduationDate || ""],
      institutions: [educationData?.institutions || ""],
      degree: [educationData?.degree || ""],
      fieldOfStudy: [educationData?.fieldOfStudy || ""],
    });
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  submit(addressDetails: UserEducationDTO) {
    if (this.userEducationForm.valid) {
      const formData = this.userEducationForm.value;
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
