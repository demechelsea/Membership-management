import {
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnInit, ViewChild,
} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseComponent} from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import {Observable, Subject, takeUntil} from "rxjs";
import {PositionService} from "app/association-settings/services/position-service/position.service";
import {CommitteePositionDTO} from "app/models/committeePositionDTO";
import CommitteeDTO from "app/models/committeeDTO";
import {AppConfirmService} from "app/common/services/app-confirm.service";
import {NotificationService} from "app/common/services/notification.service";
import {AssociationDTO} from "app/models/AssociationDTO";
import EventDTO from "../../../models/event/eventDTO";
import {EventService} from "../../services/event-service/event.service";
import {LookupService} from "../../../common/services/lookup.service";
import {AutocompletePlaceComponent} from "../../../shared/components/autocomplete-place/autocomplete-place.component";
import * as moment from "moment/moment";

@Component({
    selector: "app-component-popup",
    templateUrl: "./event-popup.component.html",
    styleUrls: ['./event-popup.component.scss'],
})
export class EventPopupComponent extends BaseComponent implements OnInit {
    private ngUnsubscribe$ = new Subject<void>();
    public eventForm: FormGroup;
    public isLoading: boolean;
    public noResults: boolean;

    filteredIntervals$: Observable<LableValueModel[]>;

    buttonText = "Add a New Event";
    timezoneOptionsKey: string = LookupService.TIMEZONES;

    @ViewChild("location") location: AutocompletePlaceComponent;

    previewImage = {
        url: null,
        message: null
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EventPopupComponent>,
        private formBuilder: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private eventService: EventService,
        private confirmService: AppConfirmService,
        private notificationService: NotificationService
    ) {
        super();
        this.buttonText = data.isNew ? "Add a New Event" : "Edit Event";
    }

    ngOnInit() {
        console.log(this.data.payload);
        this.buildEventForm(this.data.payload)
    }

    buildEventForm(eventData: EventDTO) {

        console.log(eventData.location);



        this.eventForm = this.formBuilder.group({
            encryptedId: [this.data.isNew ? null : eventData.encryptedId, this.data.isNew ? [] : Validators.required],
            name: [eventData.name || "", Validators.required],
            location: [eventData.location || "", Validators.required],
            locationTimezone: [eventData.locationTimezone || "", Validators.required],
            startDate: [moment(eventData.startDate).format("YYYY-MM-DD") || "", Validators.required],
            startTime: [moment(eventData.startDate).format("HH:mm") || "", Validators.required],
            endDate: [moment(eventData.endDate).format("YYYY-MM-DD") || "", Validators.required],
            endTime: [moment(eventData.endDate).format("HH:mm") || "", Validators.required],
            ticketCost: [eventData.ticketCost || 0, Validators.required],
            saleEndDate: [moment(eventData.saleEndDate).format("YYYY-MM-DD") || "", Validators.required],
            ticketsAvailable: [eventData.ticketsAvailable || 0, Validators.required],
            availableToPublic: [eventData.availableToPublic || 'N', Validators.required],
            description: [eventData.description || '', Validators.required],
            imageUrl: [eventData.imageUrl || '']
        });
    }

    submit(eventDTO: EventDTO) {
        console.log("Event:", eventDTO);

        if (this.eventForm.valid) {
            const formData = Object.assign({}, this.eventForm.value);
            formData.startDate = formData.startDate + 'T' + formData.startTime;
            delete formData.startTime;

            formData.endDate = formData.endDate + 'T' + formData.endTime;
            delete formData.endTime;

            formData.imageData = this.previewImage.url;

            if (this.data.isNew) {
                this.eventService.addEvent(formData)
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

                this.eventService.editEvent(formData)
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

            }
        } else {
            this.notificationService.showWarning(
                "Please fill in all the required fields."
            )
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    onFileSelected(event: any) {
        console.log(event)
        if(!event.target.files[0] || event.target.files[0].length == 0) {
          this.previewImage.message = 'You must select an image';
            console.log(this.previewImage.message);
          return;
        }

        const mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
          this.previewImage.message = "Only images are supported";
            console.log(this.previewImage.message);
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (_event) => {
          this.previewImage.message = "";
          this.previewImage.url = reader.result;
          console.log(this.previewImage.url);
        }
    }

    deleteImage(){
        this.previewImage.url = null;
        this.previewImage.message = null;
        (<HTMLInputElement>document.getElementById('fileInput')).value = "";
    }

    onSelectedTimezoneOption(option: LableValueModel) {
        this.eventForm.controls["locationTimezone"].setValue(option.name);
    }

    getAddress(place: object) {
        if (place){
            this.eventForm.controls["location"].setValue(place['formatted_address']);
        } else {
            this.eventForm.controls['location'].setValue(this.location.autocompleteInput);
        }
    }
}
