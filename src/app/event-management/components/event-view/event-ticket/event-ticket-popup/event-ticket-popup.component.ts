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

@Component({
    selector: "app-event-ticket-popup",
    templateUrl: "./event-ticket-popup.component.html",
})
export class EventTicketPopupComponent extends BaseComponent implements OnInit {
    intervaloptionsKey: string = LookupService.MEMBERSHIP_INTERVALS;
    statusoptionsKey: string = LookupService.STATUS_OPTIONS;

    private ngUnsubscribe$ = new Subject<void>();
    public membershipPlanForm: FormGroup;
    public eventTicketForm: FormGroup;
    public intervals: LableValueModel[] = [];
    public isLoading: boolean;
    public noResults: boolean;
    filteredIntervals$: Observable<LableValueModel[]>;

    ticketTypes = [{
        name: "Free",
        value: "FREE"
    }, {
        name: "Paid",
        value: "PAID"
    }, {
        name: "Sponsors",
        value: "SPONSORS"
    }, {
        name: "Guests",
        value: "GUESTS"
    }]

    buttonText = "Create a ticket";

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EventTicketPopupComponent>,
        public lookupService: LookupService,
        private formBuilder: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private eventService: EventService,
        private localStorageService: LocalstorageService,
        private notificationService: NotificationService
    ) {
        super();
        this.buttonText = data.isNew ? "Create a ticket" : "Update ticket";
    }

    ngOnInit() {
        this.buildTicketTypeForm(this.data.payload);
        this.cdRef.detectChanges();
    }

    buildTicketTypeForm(eventTicketDTO: EventTicketDTO) {
        const isUpdate = !this.data.isNew;
        this.eventTicketForm = this.formBuilder.group({
            id: [isUpdate ? eventTicketDTO.id : null, isUpdate ? Validators.required : []],
            name: [eventTicketDTO.name || "", [Validators.required, Validators.minLength(3)],],
            description: [eventTicketDTO.description || ""],
            ticketType: [eventTicketDTO.ticketType || "", Validators.required],
            numberOfTickets: [eventTicketDTO.numberOfTickets || "", [Validators.required, positiveNumberValidator]],
            ticketPrice: [eventTicketDTO.ticketPrice || "", [Validators.required, positiveNumberValidator]],
            peopleAllowedPerTicket: [eventTicketDTO.peopleAllowedPerTicket || "", [Validators.required, positiveNumberValidator]],
            adminIssue: [this.convertToNumber(eventTicketDTO.adminIssue) || 0, Validators.required],
            visibleToPublic: new FormControl(false),
            isHidden: new FormControl(false),
        });
    }

    submit(eventTicketDTO: EventTicketDTO) {

        console.log(eventTicketDTO)

        eventTicketDTO.visibleToPublic = eventTicketDTO.visibleToPublic ? "Y" : "N";

        if (this.eventTicketForm.valid) {
            const ticketData = this.eventTicketForm.value;
            if (this.data.isNew) {
                this.eventService.addEventTicket(this.data.eventId, ticketData)
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
                this.eventService
                    .editEventTicket(this.data.eventId, eventTicketDTO.id, ticketData)
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

function positiveNumberValidator(control: FormControl) {
    const value = control.value;
    if (value === null || value === "") {
        return null;
    }
    if (isNaN(value) || value <= 0) {
        return {positiveNumber: true};
    }
    return null;
}
