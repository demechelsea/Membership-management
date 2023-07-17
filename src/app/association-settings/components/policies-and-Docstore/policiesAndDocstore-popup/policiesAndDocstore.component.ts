import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AssocationAttachmentService } from "app/association-settings/services/assocation-attachment-service/assocationAttachment.service";
import { AttachmentService } from "app/association-settings/services/attachment-service/attachment.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { AssociationDocstoreDTO } from "app/models/assocationAttachmmentDTO";
import { CommitteeMemberAttachmentDTO } from "app/models/committeeMemberAttachmmentDTO";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
  selector: "policiesAndDocstore-component-popup",
  templateUrl: "./policiesAndDocstore.component.html",
})
export class PoliciesAndDocstorePopupComponent
  extends BaseComponent
  implements OnInit
{
  private ngUnsubscribe$ = new Subject<void>();
  public policiesAndDocstoreForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = "Create attachment";
  selectedFile: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PoliciesAndDocstorePopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private assocationAttachmentService: AssocationAttachmentService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew ? "Add attachment" : "Update attachment";
  }

  ngOnInit() {
    this.buildPoliciesAndDocstoreForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildPoliciesAndDocstoreForm(
    policiesAndDocstoreData: AssociationDocstoreDTO
  ) {
    this.policiesAndDocstoreForm = this.formBuilder.group({
      docType: [policiesAndDocstoreData.docType || "", Validators.required],
      docName: [policiesAndDocstoreData.docName || "", Validators.required],
      displayToPublicFlg: [
        this.convertToNumber(policiesAndDocstoreData.displayToPublicFlg) || "",
        Validators.required,
      ],
    });
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  onFileSelected(event: any) {
    for (let file of event.files) {
      this.selectedFile = file;

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size exceeds the 10MB limit");
      }
    }
  }

  submit(assocationAttachment: AssociationDocstoreDTO) {
    if (true) {
      const formData = new FormData();
      formData.append("docType", assocationAttachment.docType.valueOf());
      formData.append("docName", assocationAttachment.docName.valueOf());
      formData.append(
        "displayToPublicFlg",
        assocationAttachment.displayToPublicFlg.valueOf() ? "Y" : "N"
      );
      if (this.data.isNew) {
        if (this.selectedFile) {
          formData.append("file", this.selectedFile);
          this.assocationAttachmentService
            .createAsscocationAttachment(formData)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
              console.log(response);
              if (response.success) {
                this.notificationService.showSuccess(
                  response.messages[0].message
                );
                this.dialogRef.close(response);
              } else {
                this.notificationService.showError(
                  response.messages[0].message
                );
              }
            });
        }
      } else {
        this.notificationService.showWarning(
          "Please fill in all the required fields."
        );
      }
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
