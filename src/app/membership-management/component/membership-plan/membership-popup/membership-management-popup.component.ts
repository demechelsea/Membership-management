import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import { NotificationService } from "app/common/services/notification.service";
import { AssociationMembersService } from "app/association-settings/services/association-members-service/association-members-service";
import moment from "moment";
import { UserDetailDTO } from "app/models/UserDetailDTO";

@Component({
  selector: "association-member-popup",
  templateUrl: "./membership-management-popup.component.html",
  styleUrls: ["./membership-management-popup.component.scss"],

})
export class AssociationMemberPopupComponent
  extends BaseComponent
  implements OnInit {

  statusoptionsKey: string = LookupService.STATUS_OPTIONS;
  membershipPlanOptionsKey: string = LookupService.MEMBERSHIP_PLAN_OPTIONS;

  private ngUnsubscribe$ = new Subject<void>();
  public committeeMemberForm: FormGroup;
  public isLoading: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;
  selectedAssociationMemberId: number;
  membershipPlanId: number;
  startDate: string;

  selectedFile: any;
  public associationMemeberForm: FormGroup;

  buttonText = "Create a association member";
  minEndDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AssociationMemberPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private associationMemberService: AssociationMembersService,
    private notificationService: NotificationService

  ) {
    super();
    this.buttonText = data.isNew
      ? "Create a association member"
      : "Update a association member";
    this.selectedAssociationMemberId = data.selectedAssociationMember;
  }

  ngOnInit() {
    this.buildAssociationMemberForm(this.data.payload);
    this.cdRef.detectChanges();
    this.handleViewAttachment();
  }


  buildAssociationMemberForm(associationMemberdata: AssociationMemberDTO) {
    const isUpdate = !this.data.isNew;
    this.associationMemeberForm = this.formBuilder.group({
      id: [isUpdate ? this.selectedAssociationMemberId : null],
      association: [associationMemberdata.association || ""],
      title: [associationMemberdata?.userDetail?.title || ""],
      firstName: [associationMemberdata?.userDetail?.firstName || ""],
      surName: [associationMemberdata?.userDetail?.surName || ""],
      displayName: [associationMemberdata?.userDetail?.displayName || ""],
      primaryPhone: [associationMemberdata?.userDetail?.primaryPhone || ""],
      primaryEmail: [associationMemberdata?.userDetail?.primaryEmail || ""],
      gender: [associationMemberdata?.userDetail?.gender || ""],
      maritalStatus: [associationMemberdata?.userDetail?.maritalStatus || ""],
      dob: [isUpdate ? moment(associationMemberdata?.userDetail?.dob).format("YYYY-MM-DD") : ""],
      membershipPlan: [associationMemberdata?.membershipPlan?.planName || ""],
      approvedDate: [isUpdate ? moment(associationMemberdata?.approvedDate).format("YYYY-MM-DD") : ""],
      introducerUser: [associationMemberdata?.introducerUser || ""],
      status: [associationMemberdata?.status || "Active"],
      highestEducation: [associationMemberdata?.highestEducation || ""],
      onlineAccessFlg: [this.convertToNumber(associationMemberdata.onlineAccessFlg) || 0,],
      photoLink: [associationMemberdata.photoLink || ""],
    });
  }

  handleViewAttachment() {
    if (this.imageURL != null) {
      let associationMemberModel = new AssociationMemberDTO();
      associationMemberModel.photoLink = this.imageURL;
      this.associationMemberService
        .downloadImage(associationMemberModel)
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

  submit(associationMember: AssociationMemberDTO) {
    console.log(associationMember);
    if (this.associationMemeberForm.valid) {

      let userDetail = new UserDetailDTO();
      userDetail.title = this.associationMemeberForm.get('title').value;
      userDetail.firstName = this.associationMemeberForm.get('firstName').value;
      userDetail.surName = this.associationMemeberForm.get('surName').value;
      userDetail.displayName = this.associationMemeberForm.get('displayName').value;
      userDetail.primaryEmail = this.associationMemeberForm.get('primaryEmail').value;
      userDetail.primaryPhone = this.associationMemeberForm.get('primaryPhone').value;
      userDetail.gender = this.associationMemeberForm.get('gender').value;
      userDetail.dob = new Date(this.associationMemeberForm.get('dob').value).toISOString().split('T')[0];
      associationMember.userDetail = userDetail;

      const formData = new FormData();
      formData.append("id", associationMember?.id?.toString());
      formData.append("userDetail", JSON.stringify(associationMember.userDetail));
      formData.append("membershipPlanId", this.membershipPlanId.toString());
      formData.append("status", associationMember?.status);
      formData.append("photoLink", associationMember?.photoLink);
      formData.append("membershipPlan", associationMember?.membershipPlan?.planName);
      formData.append("approvedDate", new Date(associationMember?.approvedDate).toISOString().split('T')[0]);
      formData.append("highestEducation", associationMember?.highestEducation.toString());
      formData.append("onlineAccessFlg", associationMember?.onlineAccessFlg ? "Y" : "N");

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      if (this.data.isNew) {
        if (this.selectedFile) {
          formData.append("photo", this.selectedFile);
        }
        this.associationMemberService
          .createAssociationMember(formData)
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

        this.associationMemberService
          .updateAssociationMember(formData)
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



  membershipPlanDisplayFn(option: any): string {
    return `${option.planName}`;
  }

  onSelectedStatusOption(option: LableValueModel) {
    this.associationMemeberForm.controls["status"].setValue(option.name);
  }

  onSelectedMembershipPlanOption(option: any) {
    this.associationMemeberForm.controls["membershipPlan"].setValue(
      option.planName
    );
    this.membershipPlanId = option.id;
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
