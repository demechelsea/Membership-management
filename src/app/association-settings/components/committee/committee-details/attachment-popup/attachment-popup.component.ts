import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AttachmentService } from "app/association-settings/services/attachment-service/attachment.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { CommitteeDocstoreDTO } from "app/models/committeeDocstoreDTO";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
  selector: "attachment-component-popup",
  templateUrl: "./attachment-popup.component.html",
})
export class AttachmentPopupComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  public attachmentForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = "Create a position";
  selectedFile: any;
  id: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AttachmentPopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private attachmentService: AttachmentService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew ? "Add attachment" : "Update attachment";
    this.id = data.id;
  }

  ngOnInit() {
    this.buildAttachmentForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildAttachmentForm(attachmentData: CommitteeDocstoreDTO) {
    attachmentData.committeeId = this.id;
    this.attachmentForm = this.formBuilder.group({
      docType: [attachmentData.docType || "", Validators.required],
      docName: [attachmentData.docName || "", Validators.required],
      displayToPublicFlg: [
        attachmentData.displayToPublicFlg || "",
        Validators.required,
      ],
      committeeId: [attachmentData.committeeId || ""],
    });
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

  submit(attachment: CommitteeDocstoreDTO) {
    if (true) {
      const formData = new FormData();
      formData.append("docType", attachment.docType.valueOf());
      formData.append("docName", attachment.docName.valueOf());
      formData.append("displayToPublicFlg", attachment.displayToPublicFlg);
      formData.append("committeeId", attachment.committeeId.toString());
      if (this.data.isNew) {
        if (this.selectedFile) {
          formData.append("file", this.selectedFile);
          this.attachmentService
            .createAttachment(formData)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
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
