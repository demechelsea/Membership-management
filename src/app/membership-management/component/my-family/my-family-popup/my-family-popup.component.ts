import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import { NotificationService } from "app/common/services/notification.service";
import { AssociationMembersService } from "app/association-settings/services/association-members-service/association-members-service";
import moment from "moment";
import { UserRelationShipDTO } from "app/models/UserRelationShipDTO";
import { MyfamilyService } from "app/membership-management/services/my-family-service/my-family.service";

@Component({
  selector: "my-family-popup",
  templateUrl: "./my-family-popup.component.html",
  styleUrls: ["./my-family-popup.component.scss"],
})
export class MyfamilyPopupComponent
  extends BaseComponent
  implements OnInit
{
  membershipPlanOptionsKey: string = LookupService.MEMBERSHIP_PLAN_OPTIONS;
  genderOptionsKey: string = LookupService.GENDER_OPTIONS;
  maritalStatusOptionsKey: string = LookupService.MARITAL_STATUS_OPTIONS;
  higherEducationOptionsKey: string = LookupService.HIGHER_EDUCATION_OPTIONS;
  titleOptionsKey: string = LookupService.TITLE_OPTIONS;

  private ngUnsubscribe$ = new Subject<void>();
  public committeeMemberForm: FormGroup;
  public isLoading: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;
  selectedUserDetailId: number;

  selectedFile: any;
  public familyMemberForm: FormGroup;

  buttonText = "Create a family member";
  minEndDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MyfamilyPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private familyMemberService: MyfamilyService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew
      ? "Create a family member"
      : "Update a family member";
    this.selectedUserDetailId = data.selectedUserDetailId;
    this.imageURL = data.photoLink;
  }

  ngOnInit() {
    this.buildAssociationMemberForm(this.data.payload);
    this.cdRef.detectChanges();
    this.handleViewAttachment();
  }

  buildAssociationMemberForm(userRelationshpdata: UserRelationShipDTO) {
    const isUpdate = !this.data.isNew;
    this.familyMemberForm = this.formBuilder.group({
      id: [isUpdate ? this.selectedUserDetailId : null],
      title: [userRelationshpdata?.fromUserDetail?.title || ""],
      firstName: [userRelationshpdata?.fromUserDetail?.firstName || ""],
      parentName: [userRelationshpdata?.fromUserDetail?.parentName || ""],
      displayName: [userRelationshpdata?.fromUserDetail?.displayName || ""],
      primaryPhone: [userRelationshpdata?.fromUserDetail?.primaryPhone || ""],
      primaryEmail: [userRelationshpdata?.fromUserDetail?.primaryEmail || ""],
      gender: [userRelationshpdata?.fromUserDetail?.gender || ""],
      maritalStatus: [userRelationshpdata?.fromUserDetail?.maritalStatus || ""],
      occupation: [userRelationshpdata?.fromUserDetail?.occupation || ""],
      relationshipType: [userRelationshpdata?.relationshipType || ""],
      toUserDetailId: [userRelationshpdata?.toUserDetailId || ""],
      dob: [
        isUpdate ? moment(userRelationshpdata?.dob).format("YYYY-MM-DD") : "",
      ],
      highestEducation: [userRelationshpdata?.highestEducation || ""],
      canLoginToAssoc: [
        this.convertToNumber(userRelationshpdata?.canLoginToAssoc) || 0,
      ],
      photoLink: [userRelationshpdata?.photoLink || ""],
    });
  }

  handleViewAttachment() {
    if (this.imageURL != null) {
      let familyMemberModel = new UserRelationShipDTO();
      familyMemberModel.photoLink = this.imageURL;
      this.familyMemberService
        .downloadImage(familyMemberModel)
        .subscribe((response: any) => {
          const blob = new Blob([response], { type: "image/jpeg" });
          const url = window.URL.createObjectURL(blob);
          this.imageURL = url;
        });
    }
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  submit(userRelationship: UserRelationShipDTO) {
    if (this.familyMemberForm.valid) {
      const formData = new FormData();
      formData.append("title", userRelationship?.title);
      formData.append("firstName", userRelationship?.firstName);
      formData.append("parentName", userRelationship?.parentName);
      formData.append("displayName", userRelationship?.displayName);
      formData.append("primaryEmail", userRelationship?.primaryEmail);
      formData.append("primaryPhone", userRelationship?.primaryPhone);
      formData.append("gender", userRelationship?.gender);
      formData.append("maritalStatus", userRelationship?.maritalStatus);
      formData.append("dob", userRelationship?.dob);
      formData.append("highestEducation",userRelationship?.highestEducation);
      formData.append("occupation",userRelationship?.occupation);
      formData.append("relationshipType",userRelationship?.relationshipType);
      formData.append("canLoginToAssoc",userRelationship?.canLoginToAssoc ? "Y" : "N");
      formData.append("toUserDetailId", this.selectedUserDetailId.toString());

      formData.append("photoLink", userRelationship?.photoLink);
      
    
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      if (this.data.isNew) {
        if (this.selectedFile) {
          formData.append("photo", this.selectedFile);
        }
        this.familyMemberService
          .createFamilyMember(formData)
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
        if (this.selectedFile) {
          formData.append("photo", this.selectedFile);
        }

        this.familyMemberService
          .updateFamilyMember(formData)
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

  onSelectedOption(option: LableValueModel) {
    this.familyMemberForm.controls["title"].setValue(option.name);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  imageURL: string;

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.imageURL = reader.result as string);

      reader.readAsDataURL(file);
    }
  }
}
