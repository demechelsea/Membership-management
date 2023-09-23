import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { NotificationService } from "app/common/services/notification.service";
import moment from "moment";
import { MyfamilyService } from "app/membership-management/services/my-family-service/my-family.service";
import { UserDetailDTO } from "app/models/UserDetailDTO";
import { UserProfileService } from "app/membership-management/services/user-profile-service/user-profile.service";

@Component({
  selector: "profie-highlight-popup",
  templateUrl: "./profie-highlight-popup.component.html",
  styleUrls: ["./profie-highlight-popup.component.scss"],
})
export class ProfilehighlightPopupComponent
  extends BaseComponent
  implements OnInit
{
  private ngUnsubscribe$ = new Subject<void>();
  public isLoading: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;
  selectedUserDetailId: number;

  genderOptionsKey: string = LookupService.GENDER_OPTIONS;
  maritalStatusOptionsKey: string = LookupService.MARITAL_STATUS_OPTIONS;

  public profileHighlightForm: FormGroup;
  buttonText :string;
  memberData:any;

  minEndDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProfilehighlightPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private userProfileService: UserProfileService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = "Update profile";
    this.selectedUserDetailId = data.selectedUserDetailId;
    this.memberData = data.memberData;

  }

  ngOnInit() {
    this.buildAssociationMemberForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildAssociationMemberForm(userDetail: UserDetailDTO) {
    this.profileHighlightForm = this.formBuilder.group({
      id: [this.memberData.userDetail.id],
      title: [this.memberData.userDetail.title],
      firstName: [this.memberData.userDetail.firstName],
      parentName: [this.memberData.userDetail.parentName],
      givenName: [this.memberData.userDetail.givenName],
      gender: [this.memberData.userDetail.gender],
      maritalStatus: [this.memberData.userDetail.maritalStatus],
      dob: [moment(this.memberData.userDetail.dob).format("YYYY-MM-DD")],
    });
  }

  onSelectedGenderOption(option: LableValueModel) {
    this.profileHighlightForm.controls["gender"].setValue(option.name);
  }

  onSelectedMaritalStatusOption(option: LableValueModel) {
    this.profileHighlightForm.controls["maritalStatus"].setValue(option.name);
  }

  submit(userDetail: UserDetailDTO) {
    if (this.profileHighlightForm.valid) {
      const formData = this.profileHighlightForm.value;
        this.userProfileService
          .updateUserProfile(formData)
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
