import { Component, OnInit } from "@angular/core";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { SoraxColumnDefinition } from "app/common/components/sorax-table-view/sorax-column-definition";
import { BaseComponent } from "app/core/components/base/base.component";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject, takeUntil } from "rxjs";

import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import { ActivatedRoute, Router } from "@angular/router";
import { UserProfileSettingDTO } from "app/models/UserProfileSettingDTO";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserRelationShipDTO } from "app/models/UserRelationShipDTO";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ProfilehighlightPopupComponent } from "./profile-highlight-popup/profie-highlight-popup.component";
import { NotificationService } from "app/common/services/notification.service";
import { UserProfileSettingService } from "app/membership-management/services/user-profile-setting-service/user-profile-setting.service";
import { UserDetailDTO } from "app/models/UserDetailDTO";
import { log } from "console";

@Component({
  selector: "app-membership-plan",
  templateUrl: "./profile-highlight.component.html",
  styleUrls: ["./profile-highlight.component.scss"],
  animations: SoraxAnimations,
})
export class ProfileHighlightComponent extends BaseComponent implements OnInit {
  public associationMemberData: any;
  public membershipColumns: SoraxColumnDefinition[];

  public memberData: any;
  associationMemberId: number;
  public profileSettingForm: FormGroup;
  public profileSettingData: any;

  private ngUnsubscribe$ = new Subject<void>();
  imageURL: string;

  resultViewModel: ResultViewModel = new ResultViewModel();
  listPlans: AssociationMemberDTO[];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private userProfileSettingService: UserProfileSettingService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.memberData = JSON.parse(params["memberData"]);
      this.associationMemberId = this.memberData.userDetail.id;
    });
    this.getProfileSettings();
    this.buildprofileSettingForm(new UserProfileSettingDTO());
  }

  getProfileSettings() {
    let userDetail = new UserDetailDTO();
    userDetail.id = this.memberData.userDetail.id;
    this.userProfileSettingService
      .getUserProfileSetting(userDetail)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        this.profileSettingData = response.result;
        this.imageURL = this.profileSettingData.photoLink;
        this.buildprofileSettingForm(new UserProfileSettingDTO());
      });
  }

  handleViewAttachment() {
    if (this.imageURL != null) {
      let userProfileSetting = new UserProfileSettingDTO();
      userProfileSetting.photoLink = this.imageURL;
      this.userProfileSettingService
        .downloadImage(userProfileSetting)
        .subscribe((response: any) => {
          const blob = new Blob([response], { type: "image/jpeg" });
          const url = window.URL.createObjectURL(blob);
          this.imageURL = url;
        });
    }
  }

  mapFormDataToPlanData(formData: any): UserProfileSettingDTO {
    return {
      ...formData,
      emailNotificationFlg: formData.emailNotificationFlg ? "Y" : "N",
      mobileNotificationFlg: formData.mobileNotificationFlg ? "Y" : "N",
      contactVisibility: formData.contactVisibility ? "Y" : "N",
      photoVisibility: formData.photoVisibility ? "Y" : "N",
    };
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  buildprofileSettingForm(userProfile: UserProfileSettingDTO) {
    this.profileSettingForm = this.formBuilder.group({
      id: [this.profileSettingData?.id, Validators.required],
      emailNotificationFlg: [
        this.convertToNumber(this.profileSettingData?.emailNotificationFlg) ||
          0,
      ],
      mobileNotificationFlg: [
        this.convertToNumber(this.profileSettingData?.mobileNotificationFlg) ||
          0,
      ],
      contactVisibility: [
        this.convertToNumber(userProfile.contactVisibility) || 0,
      ],
      photoVisibility: [this.convertToNumber(userProfile.photoVisibility) || 0],
    });
  }

  submit(userProfileSetting: UserProfileSettingDTO) {
    if (this.profileSettingForm.valid) {
      const formData = this.profileSettingForm.value;
      const planData = this.mapFormDataToPlanData(formData);
      this.userProfileSettingService
        .updateUserProfileSetting(planData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          if (response.success) {
            this.notificationService.showSuccess(response.messages[0].message);
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

  openMembershipManagement() {
    this.router.navigate(["./membershipManagement/membershipManagement"]);
  }

  openPopUp(data: UserRelationShipDTO, isNew?: boolean) {
    let title = "Personal Details";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      ProfilehighlightPopupComponent,
      {
        width: "800px",
        disableClose: true,
        data: {
          title: title,
          memberData: this.memberData,
          isNew: isNew,
          selectedUserDetailId: this.memberData.id,
        },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
