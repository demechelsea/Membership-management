import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AttachmentService } from "app/association-settings/services/attachment-service/attachment.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { CommitteeDocstoreDTO } from "app/models/committeeDocstoreDTO";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import EventGalleryDTO from "../../../../../models/event/eventGalleryDTO";
import {EventService} from "../../../../services/event-service/event.service";

@Component({
    selector: "event-gallery-component-popup",
    templateUrl: "./event-gallery-popup.component.html",
})
export class EventGalleryPopupComponent extends BaseComponent implements OnInit {
    private ngUnsubscribe$ = new Subject<void>();
    public galleryForm: FormGroup;
    public isLoading: boolean;
    public noResults: boolean;
    filteredIntervals$: Observable<LableValueModel[]>;

    buttonText;
    selectedFile: any;
    id: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EventGalleryPopupComponent>,
        private formBuilder: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private eventService: EventService,
        private notificationService: NotificationService
    ) {
        super();
        this.buttonText = "Upload Photo";
        this.id = data.id;
    }

    ngOnInit() {
        this.buildAttachmentForm(this.data.payload);
        this.cdRef.detectChanges();
    }

    buildAttachmentForm(eventGalleryDTO: EventGalleryDTO) {
        this.galleryForm = this.formBuilder.group({
            type: [eventGalleryDTO.type || "", Validators.required],
            name: [eventGalleryDTO.name || "", Validators.required],
            showToPublic: [eventGalleryDTO.showToPublic || "", Validators.required,]
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

    submit(eventGalleryDTO: EventGalleryDTO) {

        let showToPublic = eventGalleryDTO.showToPublic ? "Y" : "N";

        const formData = new FormData();
        formData.append("type", eventGalleryDTO.type.valueOf());
        formData.append("name", eventGalleryDTO.name.valueOf());
        formData.append("showToPublic", showToPublic);
        formData.append("encryptedEventId", this.data.eventId);
        if (this.selectedFile) {
            formData.append("file", this.selectedFile);
            this.eventService
                .addEventGallery(formData)
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
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
