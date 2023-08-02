import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { PositionService } from "app/association-settings/services/position-service/position.service";
import { CommitteePositionDTO } from "app/models/committeePositionDTO";
import CommitteeDTO from "app/models/committeeDTO";
import { AppConfirmService } from "app/common/services/app-confirm.service";
import { NotificationService } from "app/common/services/notification.service";
import { AssociationDTO } from "app/models/AssociationDTO";
import EventDTO from "../../../models/event/eventDTO";
import {EventService} from "../../services/event-service/event.service";

@Component({
  selector: "app-component-popup",
  templateUrl: "./event-popup.component.html",
})
export class EventPopupComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  public eventForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = "Add a New Event";

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
    // this.cdRef.detectChanges();
  }

  buildEventForm(eventData: EventDTO) {
    this.eventForm = this.formBuilder.group({
      name: [eventData.name || "", Validators.required],
      location: [eventData.location || "", Validators.required],
      locationTimezone: [eventData.locationTimezone || "", Validators.required],
      startDate: [eventData.startDate || "", Validators.required],
      startTime: [eventData.startTime || "", Validators.required],
      endDate: [eventData.endDate || "", Validators.required],
      endTime: [eventData.endTime || "", Validators.required],
      ticketCost: [eventData.ticketCost || 0, Validators.required],
      saleEndDate: [eventData.saleEndDate || "", Validators.required],
      ticketsAvailable: [eventData.ticketsAvailable || 0, Validators.required],
      availableToPublic: [eventData.availableToPublic || 'N', Validators.required],
      description: [eventData.description || '', Validators.required],
      imageUrl: [eventData.imageUrl || '']
    });
  }

  submit(eventDTO: EventDTO) {
    console.log("Event:", eventDTO);

    if (this.eventForm.valid){
      const formData = Object.assign({}, this.eventForm.value);
      formData.startDate = formData.startDate + 'T' + formData.startTime;
      delete formData.startTime;

      formData.endDate = formData.endDate + 'T' + formData.endTime;
      delete formData.endTime;

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

    // if(!event.target.files[0] || event.target.files[0].length == 0) {
    //   this.msg = 'You must select an image';
    //   return;
    // }
    //
    // const mimeType = event.target.files[0].type;
    //
    // if (mimeType.match(/image\/*/) == null) {
    //   this.msg = "Only images are supported";
    //   return;
    // }
    //
    // const reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    //
    // reader.onload = (_event) => {
    //   this.msg = "";
    //   this.url = reader.result;
    // }
  }
}
