import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { Subject, takeUntil } from "rxjs";
import { NotificationService } from "app/common/services/notification.service";
import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import moment from "moment";
import { AssocationMemberService } from "app/association-settings/services/assocation-member-service/assocation-member.service";
import { UserDetailDTO } from "app/models/UserDetailDTO";

@Component({
  selector: "membership-details-popup",
  templateUrl: "./membership-details-popup.component.html",
  styleUrls: ["./membership-details-popup.component.scss"],
})
export class MembershipDetailsPopupComponent
  extends BaseComponent
  implements OnInit
{
  membershipPlanOptionsKey: string = LookupService.MEMBERSHIP_PLAN_OPTIONS;

  private ngUnsubscribe$ = new Subject<void>();
  public committeeMemberForm: FormGroup;
  public isLoading: boolean;
  selectedAssociationMember: any;

  public membershipDetailsForm: FormGroup;

  buttonText = "Subscribe";
  minEndDate: string;
  membershipPlanId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembershipDetailsPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private membershipDetailsService: AssocationMemberService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = "Subscribe";
    this.selectedAssociationMember = data.selectedUserDetail;
  }

  ngOnInit() {
    this.buildAssociationMemberForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildAssociationMemberForm(membershipDetailsData: AssociationMemberDTO) {
    const isUpdate = !this.data.isNew;
    this.membershipDetailsForm = this.formBuilder.group({
      userDetail: [isUpdate ? this.selectedAssociationMember.userDetail : null],
      membershipPlanId: [this.membershipPlanId || ""],
      approvedDate: [
        moment(membershipDetailsData?.approvedDate).format("YYYY-MM-DD") || null,
      ],
      onlineAccessFlg: [
        this.convertToNumber(membershipDetailsData.onlineAccessFlg) || 0,
      ],
    });
  }

  membershipPlanDisplayFn(option: any): string {
    return `${option.planName}`;
  }

  onSelectedMembershipPlanOption(option: any) {
    this.membershipDetailsForm.controls["membershipPlanId"].setValue(
      option.planName
    );
    this.membershipPlanId = option.id;
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  mapFormDataToPlanData(formData: any): AssociationMemberDTO {
    return {
      ...formData,
      onlineAccessFlg: formData.onlineAccessFlg ? "Y" : "N",
    };
  }

  submit(associationData: AssociationMemberDTO) {
    let associationMember = new AssociationMemberDTO();
    associationMember = this.membershipDetailsForm.value;
    associationMember.membershipPlanId = this.membershipPlanId;
    associationMember.userDetail = this.selectedAssociationMember.userDetail;
    const planData = this.mapFormDataToPlanData(associationMember);
    if (this.membershipDetailsForm.valid) {
      if (this.data.isNew) {
        this.membershipDetailsService
          .subscribeToMemberDetails(planData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe((response) => {
            if (response) {
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
