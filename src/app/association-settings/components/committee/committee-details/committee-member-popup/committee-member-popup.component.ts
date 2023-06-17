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
import { AssociationMemberDTO } from 'app/models/AssociationMemberDTO ';


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
  ) {
    super();
    this.buttonText = data.isNew ? 'Create a committee member' : 'Update committee member';
    this.committeeId = data.selectedCommittee.id;
    this.startDate = data.selectedCommittee.startDate;
    this.endDate = data.selectedCommittee.endDate;
  }


  ngOnInit() {
    this.buildCommitteeMemberForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  onAddPosition() {
    this.dialogRef.close();
    this.addPosition.emit();
  }


  buildCommitteeMemberForm(committeeMemberData: CommitteeMemberDTO) {
    const isUpdate = !this.data.isNew;
    this.committeeMemberForm = this.formBuilder.group({
      //id: [committeeMemberData.committee.id ],
      member: [committeeMemberData?.associationMember || '', Validators.required],
      firstName: [committeeMemberData?.associationMember?.userDetail?.firstName || '',],
      givenName: [committeeMemberData?.associationMember?.userDetail?.givenName || '',],
      primaryPhone: [committeeMemberData?.associationMember?.userDetail?.primaryPhone || '',],
      primaryEmail: [committeeMemberData?.associationMember?.userDetail?.primaryEmail || '',],
      committeePosition: [committeeMemberData.committeePosition || ''],
      preferredNameDisplay: [committeeMemberData.preferredNameDisplay || ''],
      phoneVisibilityFlg: [this.convertToNumber(committeeMemberData.phoneVisibilityFlg) || 0, Validators.required],
      emailVisibilityFlg: [this.convertToNumber(committeeMemberData.emailVisibilityFlg) || 0, Validators.required],
      startDate: [isUpdate ? moment(committeeMemberData.startDate).format('YYYY-MM-DD') : moment(this.startDate).format('YYYY-MM-DD'), Validators.required],
      photoLink: [committeeMemberData.photoLink || ''],
      status: [committeeMemberData?.associationMember?.status || 'active', isUpdate ? Validators.required : []],
      endDate: [isUpdate ? moment(committeeMemberData.endDate).format('YYYY-MM-DD') : moment(this.endDate).format('YYYY-MM-DD'), Validators.required],
      committee:[isUpdate ? committeeMemberData.committee : '']
    });
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

    committeeMember.committee = new CommitteeDTO();
    committeeMember.committee.id = this.committeeId;

    committeeMember.associationMember = new AssociationMemberDTO();
    committeeMember.associationMember.id = this.associationMemberId;

    committeeMember.committeePosition = new CommitteePositionDTO();
    committeeMember.committeePosition.id = this.positionId;
    

    console.log("hi ", committeeMember)
    if (this.committeeMemberForm.valid) {
      const formData = this.committeeMemberForm.value;
      const planData = this.mapFormDataToPlanData(formData);
      if (this.data.isNew) {
        this.committeeMemberService.createCommitteeMember(planData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(response => {
            this.dialogRef.close(response);
          }, error => {
            console.error('Failed to create a new committee:', error);
            alert('Something went wrong. Please try again later.');
          });
      } else {
        this.committeeMemberService.updateCommitteeMember(committeeMember.id, planData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(response => {
            console.log('Updated an existing committee:', response);
            this.dialogRef.close(response);
          }, error => {
            console.error('Failed to update an existing committee:', error);
            alert('Something went wrong. Please try again later.');
          });
      }
    } else {
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
