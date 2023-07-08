import { ChangeDetectorRef, Component, Inject, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LookupService } from 'app/common/services/lookup.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import LableValueModel from 'app/models/lable-value-model';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import { CommitteeMemberService } from 'app/association-settings/services/committee-member-service/committee-member.service';
import { CommitteeMemberDTO } from 'app/models/committeeMemberDTO';
import { CommitteePositionDTO } from 'app/models/committeePositionDTO';
import CommitteeDTO from 'app/models/committeeDTO';
import { NotificationService } from 'app/common/services/notification.service';


@Component({
  selector: 'committee-member-popup',
  templateUrl: './committee-member-popup.component.html',
  styleUrls: ['./committee-member.popup.scss'],

})
export class CommitteeMemberPopupComponent extends BaseComponent implements OnInit {

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
  endDate: string

  buttonText = 'Create a committee member';
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
    this.buttonText = data.isNew ? 'Create a committee member' : 'Update committee member';
    this.committeeId = data.selectedCommittee.id;
    this.startDate = data.selectedCommittee.startDate;
    this.endDate = data.selectedCommittee.endDate;
    this.associationMemberId = data.associationMemberId;
    this.positionId = data.positionId;
    this.selectedCommitteeMemberId = data.selectedCommitteeMember;
  }


  ngOnInit() {
    this.buildCommitteeMemberForm(this.data.payload);
    this.cdRef.detectChanges();
    this.committeeMemberForm.get('status').valueChanges.pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(status => {
      if (status !== 'Inactive') {
        this.committeeMemberForm.get('endDate').setValue(null);
      } });      
  }

  onAddPosition() {
    this.dialogRef.close();
    this.addPosition.emit();
  }


  buildCommitteeMemberForm(committeeMemberData: CommitteeMemberDTO) {
    const isUpdate = !this.data.isNew;
    this.committeeMemberForm = this.formBuilder.group({
      id: [isUpdate ? this.selectedCommitteeMemberId : null],
      member: [committeeMemberData.associationMember],
      firstName: [committeeMemberData?.associationMember?.userDetail?.firstName || '',],
      givenName: [committeeMemberData?.associationMember?.userDetail?.givenName || '',],
      primaryPhone: [committeeMemberData?.associationMember?.userDetail?.primaryPhone || '',],
      primaryEmail: [committeeMemberData?.associationMember?.userDetail?.primaryEmail || '',],
      committeePosition: [isUpdate ? committeeMemberData.committeePosition.positionName : ''],
      preferredNameDisplay: [committeeMemberData.preferredNameDisplay || ''],
      phoneVisibilityFlg: [this.convertToNumber(committeeMemberData.phoneVisibilityFlg) || 0],
      emailVisibilityFlg: [this.convertToNumber(committeeMemberData.emailVisibilityFlg) || 0],
      startDate: [isUpdate ? moment(committeeMemberData.startDate).format('YYYY-MM-DD') : moment(this.startDate).format('YYYY-MM-DD')],
      photoLink: [committeeMemberData.photoLink || ''],
      status: [isUpdate ? committeeMemberData.status : 'Active'],
      endDate: [isUpdate ? moment(committeeMemberData.endDate).format('YYYY-MM-DD') : moment(this.endDate).format('YYYY-MM-DD')],
    });

    if (isUpdate) {
      this.committeeMemberForm.controls['firstName'].disable();
      this.committeeMemberForm.controls['givenName'].disable();
      this.committeeMemberForm.controls['primaryPhone'].disable();
      this.committeeMemberForm.controls['primaryEmail'].disable();
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
      const formData = this.committeeMemberForm.value;
      formData.id = this.selectedCommitteeMemberId;
      formData.committee = new CommitteeDTO()
      formData.committee.setValue({ id: this.committeeId });
      formData.associationMember.setValue({ id: this.associationMemberId });
      formData.committeePosition.setValue({ id: this.positionId });

      const planData = this.mapFormDataToPlanData(formData);
      if (this.data.isNew) {
        this.committeeMemberService.createCommitteeMember(planData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(response => {
            if (response.success) {
              this.notificationService.showSuccess(response.messages[0].message);
              this.dialogRef.close(response);
            }
            else {
              this.notificationService.showError(response.messages[0].message);
            }
          });
      } else {
        this.committeeMemberService.updateCommitteeMember(committeeMember.id, planData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(response => {
            if (response.success) {
              this.notificationService.showSuccess(response.messages[0].message);
              this.dialogRef.close(response);
            }
            else {
              this.notificationService.showError(response.messages[0].message);
            }
          });
      }
    } else {
      this.notificationService.showWarning('Please fill in all the required fields.');
    }
  }


  mapFormDataToPlanData(formData: any): CommitteeMemberDTO {
    return {
      ...formData,
      phoneVisibilityFlg: formData.phoneVisibilityFlg ? "Y" : "N",
      emailVisibilityFlg: formData.emailVisibilityFlg ? "Y" : "N",
    };
  }


  onSelectedStatusOption(option: LableValueModel) {
    this.committeeMemberForm.controls['status'].setValue(option.name);
  }

  onSelectedPositionOption(option: any) {
    this.committeeMemberForm.controls['committeePosition'].setValue(option.positionName);
    this.positionId = option.id;
  }

  onSelectedMemberOption(option: any) {
    // Set the value of the member control
    this.committeeMemberForm.controls['member'].setValue(`${option.userDetail.firstName} ${option.userDetail.givenName} ${option.userDetail.parentName}`);
    this.committeeMemberForm.controls['firstName'].setValue(option.userDetail.firstName);
    this.committeeMemberForm.controls['givenName'].setValue(option.userDetail.givenName);
    this.committeeMemberForm.controls['primaryPhone'].setValue(option.userDetail.primaryPhone);
    this.committeeMemberForm.controls['primaryEmail'].setValue(option.userDetail.primaryEmail);
    this.committeeMemberForm.controls['preferredNameDisplay'].setValue(option.userDetail.firstName);

    this.committeeMemberForm.controls['firstName'].disable();
    this.committeeMemberForm.controls['givenName'].disable();
    this.committeeMemberForm.controls['primaryPhone'].disable();
    this.committeeMemberForm.controls['primaryEmail'].disable();

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

      const reader = new FileReader();
      reader.onload = e => this.imageURL = reader.result as string;

      reader.readAsDataURL(file);
    }
  }

}
