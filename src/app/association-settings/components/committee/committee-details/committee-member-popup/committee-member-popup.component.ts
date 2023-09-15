import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import * as moment from "moment";
import { CommitteeMemberService } from "app/association-settings/services/committee-member-service/committee-member.service";
import { CommitteeMemberDTO } from "app/models/committeeMemberDTO";
import { CommitteePositionDTO } from "app/models/committeePositionDTO";
import { NotificationService } from "app/common/services/notification.service";

@Component({
  selector: "committee-member-popup",
  templateUrl: "./committee-member-popup.component.html",
  styleUrls: ["./committee-member.popup.scss"],
})
export class CommitteeMemberPopupComponent
  extends BaseComponent
  implements OnInit
{
  @Output() addPosition: EventEmitter<void> = new EventEmitter<void>();

  statusoptionsKey: string = LookupService.STATUS_OPTIONS;
  positionoptionsKey: string = LookupService.POSITION_OPTIONS;
  memberoptionsKey: string = LookupService.MEMBER_OPTIONS;

  private ngUnsubscribe$ = new Subject<void>();
  public committeeMemberForm: FormGroup;
  public intervals: LableValueModel[] = [];
  public committeePositions: CommitteePositionDTO[] = [];
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;
  committeeId: number;
  associationMemberId: number;
  positionId: number;
  selectedCommitteeMemberId: number;
  startDate: string;
  endDate: string;

  selectedFile: any;

  buttonText = "Create a committee member";
  minEndDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CommitteeMemberPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private committeeMemberService: CommitteeMemberService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew
      ? "Create a committee member"
      : "Update committee member";
    this.committeeId = data.selectedCommittee.id;
    this.startDate = data.selectedCommittee.startDate;
    this.endDate = data.selectedCommittee.endDate;
    this.associationMemberId = data.associationMemberId;
    this.positionId = data.positionId;
    this.selectedCommitteeMemberId = data.selectedCommitteeMember;
    this.imageURL = data.photoLink;
  }

  ngOnInit() {
    this.buildCommitteeMemberForm(this.data.payload);
    this.cdRef.detectChanges();
    this.committeeMemberForm
      .get("status")
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((status) => {
        if (status !== "Inactive") {
          this.committeeMemberForm.get("endDate").setValue(null);
        }
      });
    this.handleViewAttachment();
  }

  onAddPosition() {
    this.addPosition.emit();
  }

  buildCommitteeMemberForm(committeeMemberData: CommitteeMemberDTO) {
    const isUpdate = !this.data.isNew;
    this.committeeMemberForm = this.formBuilder.group({
      id: [isUpdate ? this.selectedCommitteeMemberId : null],
      member: [committeeMemberData.associationMember],
      firstName: [
        committeeMemberData?.associationMember?.userDetail?.firstName || "",
      ],
      givenName: [
        committeeMemberData?.associationMember?.userDetail?.givenName || "",
      ],
      primaryPhone: [
        committeeMemberData?.associationMember?.userDetail?.primaryPhone || "",
      ],
      primaryEmail: [
        committeeMemberData?.associationMember?.userDetail?.primaryEmail || "",
      ],
      committeePosition: [
        isUpdate ? committeeMemberData.committeePosition.positionName : "",
      ],
      preferredNameDisplay: [committeeMemberData.preferredNameDisplay || ""],
      phoneVisibilityFlg: [
        this.convertToNumber(committeeMemberData.phoneVisibilityFlg) || 0,
      ],
      emailVisibilityFlg: [
        this.convertToNumber(committeeMemberData.emailVisibilityFlg) || 0,
      ],
      startDate: [
        isUpdate
          ? moment(committeeMemberData.startDate).format("YYYY-MM-DD")
          : moment(this.startDate).format("YYYY-MM-DD"),
      ],
      photoLink: [committeeMemberData.photoLink || ""],
      status: [isUpdate ? committeeMemberData.status : "Active"],
      endDate: [
        isUpdate
          ? moment(committeeMemberData.endDate).format("YYYY-MM-DD")
          : moment(this.endDate).format("YYYY-MM-DD"),
      ],
    });

    if (isUpdate) {
      this.committeeMemberForm.controls["firstName"].disable();
      this.committeeMemberForm.controls["givenName"].disable();
      this.committeeMemberForm.controls["primaryPhone"].disable();
      this.committeeMemberForm.controls["primaryEmail"].disable();
    }
  }

  handleViewAttachment() {
    if (this.imageURL != null) {
      let committeeMemberModel = new CommitteeMemberDTO();
      committeeMemberModel.photoLink = this.imageURL;
      this.committeeMemberService
        .downloadImage(committeeMemberModel)
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

  memberDisplayFn(option: any): string {
    return `${option.userDetail.firstName} ${option.userDetail.givenName} ${option.userDetail.parentName}`;
  }

  positionDisplayFn(option: any): string {
    return `${option.positionName}`;
  }

  submit(committeeMember: CommitteeMemberDTO) {
    if (this.committeeMemberForm.valid) {
      committeeMember.startDate = new Date(committeeMember.startDate);
      committeeMember.endDate = new Date(committeeMember.endDate);
      const formData = new FormData();
      formData.append("committeeId", this.committeeId.toString());
      formData.append(
        "associationMemberId",
        this.associationMemberId.toString()
      );
      formData.append("committeePositionId", this.positionId.toString());
      formData.append(
        "preferredNameDisplay",
        committeeMember.preferredNameDisplay
      );
      formData.append("photoLink", committeeMember.photoLink);
      formData.append("status", committeeMember.status);
      formData.append(
        "phoneVisibilityFlg",
        committeeMember.phoneVisibilityFlg ? "Y" : "N"
      );
      formData.append(
        "emailVisibilityFlg",
        committeeMember.emailVisibilityFlg ? "Y" : "N"
      );
      formData.append("startDate", committeeMember.startDate.toString());
      formData.append("endDate", committeeMember.endDate.toString());

      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      if (this.data.isNew) {
        if (this.selectedFile) {
          formData.append("photo", this.selectedFile);
        }

        this.committeeMemberService
          .createCommitteeMember(formData)
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
        formData.append("id", committeeMember.id.toString());

        this.committeeMemberService
          .updateCommitteeMember(formData)
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
  onSelectedStatusOption(option: LableValueModel) {
    this.committeeMemberForm.controls["status"].setValue(option.name);
  }

  onSelectedPositionOption(option: any) {
    this.committeeMemberForm.controls["committeePosition"].setValue(
      option.positionName
    );
    this.positionId = option.id;
  }

  onSelectedMemberOption(option: any) {
    this.committeeMemberForm.controls["member"].setValue(
      `${option.userDetail.firstName} ${option.userDetail.givenName} ${option.userDetail.parentName}`
    );
    this.committeeMemberForm.controls["firstName"].setValue(
      option.userDetail.firstName
    );
    this.committeeMemberForm.controls["givenName"].setValue(
      option.userDetail.givenName
    );
    this.committeeMemberForm.controls["primaryPhone"].setValue(
      option.userDetail.primaryPhone
    );
    this.committeeMemberForm.controls["primaryEmail"].setValue(
      option.userDetail.primaryEmail
    );
    this.committeeMemberForm.controls["preferredNameDisplay"].setValue(
      option.userDetail.firstName
    );

    this.committeeMemberForm.controls["firstName"].disable();
    this.committeeMemberForm.controls["givenName"].disable();
    this.committeeMemberForm.controls["primaryPhone"].disable();
    this.committeeMemberForm.controls["primaryEmail"].disable();

    this.associationMemberId = option.id;
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
