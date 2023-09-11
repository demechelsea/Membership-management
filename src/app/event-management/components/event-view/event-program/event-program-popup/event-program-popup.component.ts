import {ChangeDetectorRef, Component, Inject, OnInit} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LookupService} from "app/common/services/lookup.service";
import {BaseComponent} from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import {Observable, Subject, takeUntil} from "rxjs";
import {LocalstorageService} from "app/common/services/localstorage.service";
import {NotificationService} from "app/common/services/notification.service";
import {EventService} from "../../../../services/event-service/event.service";
import EventTicketDTO from "../../../../../models/event/eventTicketDTO";
import EventProgramDTO from "../../../../../models/event/eventProgramDTO";

@Component({
    selector: "app-event-program-popup",
    templateUrl: "./event-program-popup.component.html",
})
export class EventProgramPopupComponent extends BaseComponent implements OnInit {
    intervaloptionsKey: string = LookupService.MEMBERSHIP_INTERVALS;
    statusoptionsKey: string = LookupService.STATUS_OPTIONS;

    private ngUnsubscribe$ = new Subject<void>();
    public membershipPlanForm: FormGroup;
    public eventProgramForm: FormGroup;
    public intervals: LableValueModel[] = [];
    public isLoading: boolean;
    public noResults: boolean;
    filteredIntervals$: Observable<LableValueModel[]>;

    availableStatus = [{
        name: "Draft",
        value: "DRAFT"
    }, {
        name: "Pending",
        value: "PENDING"
    }, {
        name: "Finalized",
        value: "FINALIZED"
    }]

    buttonText = "Create a ticket";

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EventProgramPopupComponent>,
        public lookupService: LookupService,
        private formBuilder: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private eventService: EventService,
        private localStorageService: LocalstorageService,
        private notificationService: NotificationService
    ) {
        super();
        this.buttonText = data.isNew ? "Add a program" : "Edit program";
    }

    ngOnInit() {
        this.buildEventProgramForm(this.data.payload);
        this.cdRef.detectChanges();
    }

    buildEventProgramForm(eventProgramDTO: EventProgramDTO) {
        const isUpdate = !this.data.isNew;
        this.eventProgramForm = this.formBuilder.group({
            id: [isUpdate ? eventProgramDTO.id : null, isUpdate ? Validators.required : []],
            encryptedId: [isUpdate ? eventProgramDTO.encryptedId : null, isUpdate ? Validators.required : []],
            startTime: [eventProgramDTO.startTime || "", [Validators.required]],
            endTime: [eventProgramDTO.endTime || "", [Validators.required]],
            duration: [eventProgramDTO.duration || "", [Validators.required]],
            name: [eventProgramDTO.name || "", [Validators.required, Validators.minLength(3)],],
            description: [eventProgramDTO.description || ""],
            contactPhone: [eventProgramDTO.contactPhone || "", Validators.required],
            contactPerson: [eventProgramDTO.contactPerson || "", Validators.required],
            participants: [eventProgramDTO.participants || "", Validators.required],
            status: [eventProgramDTO.status || "", Validators.required]
        });
    }

    submit(eventProgramDTO: EventProgramDTO) {

        console.log(eventProgramDTO)

        if (this.eventProgramForm.valid) {
            const programData = this.eventProgramForm.value;
            programData.encryptedEventId = this.data.eventId;
            if (this.data.isNew) {
                this.eventService.addEventProgram(programData)
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe((response) => {
                        if (response.success) {
                            this.notificationService.showSuccess(
                                response.messages[0].message
                            )
                            this.dialogRef.close(response);
                        } else {
                            this.notificationService.showError(response.messages[0].message);
                        }
                    })
            } else {
                programData.encryptedId = eventProgramDTO.encryptedId;
                this.eventService
                    .editEventProgram(programData)
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
        }
    }

    convertToNumber(str: string): number {
        return str == "Y" ? 1 : 0;
    }

    onSelectedIntervalOption(option: LableValueModel) {
        this.membershipPlanForm.controls["interval"].setValue(option.name);
    }

    onSelectedStatusOption(option: LableValueModel) {
        this.membershipPlanForm.controls["status"].setValue(option.name);
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
