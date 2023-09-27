import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { Subject, takeUntil } from "rxjs";
import { NotificationService } from "app/common/services/notification.service";
import { MycompanyService } from "app/membership-management/services/my-companies-service/my-companies.service";
import { UserContactDTO } from "app/models/UserContactDTO";
import { ContactService } from "app/membership-management/services/contact-service/contact.service";

@Component({
  selector: "contact-details-popup",
  templateUrl: "./contact-details-popup.component.html",
  styleUrls: ["./contact-details-popup.component.scss"],
})
export class ContactDetailsPopupComponent
  extends BaseComponent
  implements OnInit
{
  membershipPlanOptionsKey: string = LookupService.MEMBERSHIP_PLAN_OPTIONS;

  private ngUnsubscribe$ = new Subject<void>();
  public isLoading: boolean;
  selectedUserDetailId: number;

  public contactDetailsForm: FormGroup;

  buttonText = "Add";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ContactDetailsPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private contactService: ContactService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = "Add";
    this.selectedUserDetailId = data.selectedUserDetailId;
  }

  ngOnInit() {
    this.buildContactDetailsForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildContactDetailsForm(contactDetailsdata: UserContactDTO) {
    const isUpdate = !this.data.isNew;
    this.contactDetailsForm = this.formBuilder.group({
      userDetailId: [this.selectedUserDetailId],
      emailId: [contactDetailsdata?.emailId || ""],
      phoneNumber: [contactDetailsdata?.phoneNumber || ""],
      emailVerified: [contactDetailsdata?.emailVerified || ""],
      phoneVerified: [contactDetailsdata?.phoneVerified || ""],
      contactType: [contactDetailsdata.contactType || 0],
    });
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  submit(contactDetails: UserContactDTO) {
    if (this.contactDetailsForm.valid) {
      const formData = this.contactDetailsForm.value;
      if (this.data.isNew) {
        this.contactService
          .createContact(formData)
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
        this.contactService
          .updateContacte(formData)
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
