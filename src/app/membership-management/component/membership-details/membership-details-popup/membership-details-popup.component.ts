import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { Subject, takeUntil } from "rxjs";
import { NotificationService } from "app/common/services/notification.service";
import { UserCompanyDTO } from "app/models/UserCompanyDTO";
import { MycompanyService } from "app/membership-management/services/my-companies-service/my-companies.service";
import committeeDTO from "app/models/committeeDTO";

@Component({
  selector: "membership-details-popup",
  templateUrl: "./membership-details-popup.component.html",
  styleUrls: ["./membership-details-popup.component.scss"],
})
export class MembershipDetailsPopupComponent
  extends BaseComponent
  implements OnInit {
  membershipPlanOptionsKey: string = LookupService.MEMBERSHIP_PLAN_OPTIONS;


  private ngUnsubscribe$ = new Subject<void>();
  public committeeMemberForm: FormGroup;
  public isLoading: boolean;
  selectedUserDetailId: number;

  public userCompaniesForm: FormGroup;

  buttonText = "Subscribe";
  minEndDate: string;
  membershipPlanId: number;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembershipDetailsPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private userCompaniesService: MycompanyService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = "Subscribe";
    this.selectedUserDetailId = data.selectedUserDetailId;
  }

  ngOnInit() {
    this.buildAssociationMemberForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildAssociationMemberForm(organizationdata: UserCompanyDTO) {
    const isUpdate = !this.data.isNew;
    this.userCompaniesForm = this.formBuilder.group({
      userDetailId: [isUpdate ? this.selectedUserDetailId : null],
      companyName: [organizationdata?.companyName || ""],
      shortName: [organizationdata?.shortName || ""],
      website: [organizationdata?.website || ""],
      // onlineAccessFlg: [
      //   this.convertToNumber(organizationdata.onlineAccessFlg) || 0,
      // ],
    });
  }

  membershipPlanDisplayFn(option: any): string {
    return `${option.planName}`;
  }

  onSelectedMembershipPlanOption(option: any) {
    this.userCompaniesForm.controls["membershipPlan"].setValue(
      option.planName
    );
    this.membershipPlanId = option.id;
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }
  submit(committee: committeeDTO) {
    console.log("committee object:", committee);
    if (this.userCompaniesForm.valid) {
      const formData = this.userCompaniesForm.value;
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
