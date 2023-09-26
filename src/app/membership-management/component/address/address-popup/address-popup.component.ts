import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { Subject, takeUntil } from "rxjs";
import { NotificationService } from "app/common/services/notification.service";
import { MycompanyService } from "app/membership-management/services/my-companies-service/my-companies.service";
import { UserContactDTO } from "app/models/UserContactDTO";
import { UserAddressDTO } from "app/models/UserAddressDTO";

@Component({
  selector: "address-popup",
  templateUrl: "./address-popup.component.html",
  styleUrls: ["./address-popup.component.scss"],
})
export class AddressPopupComponent extends BaseComponent implements OnInit {
  membershipPlanOptionsKey: string = LookupService.MEMBERSHIP_PLAN_OPTIONS;

  private ngUnsubscribe$ = new Subject<void>();
  public isLoading: boolean;
  selectedUserDetailId: number;

  public addressDetailsForm: FormGroup;

  buttonText = "Add";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddressPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private userCompaniesService: MycompanyService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = "Add";
    this.selectedUserDetailId = data.selectedUserDetailId;
  }

  ngOnInit() {
    this.buildAddressDetailsForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildAddressDetailsForm(userAddressData: UserAddressDTO) {
    const isUpdate = !this.data.isNew;
    this.addressDetailsForm = this.formBuilder.group({
      id: [isUpdate ? this.selectedUserDetailId : null],
      userDetailId: [isUpdate ? this.selectedUserDetailId : null],
      addrType: [userAddressData?.addrType || ""],
      landMark: [userAddressData?.landMark || ""],
      lineOne: [userAddressData?.lineOne || ""],
      lineTwo: [userAddressData?.lineTwo || ""],
      geoCoordinates: [userAddressData.geoCoordinates || ""],
      location: [userAddressData.location || ""],
    });
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  submit(addressDetails: UserContactDTO) {
    if (this.addressDetailsForm.valid) {
      const formData = this.addressDetailsForm.value;
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
