import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Subject, takeUntil } from "rxjs";
import { LocalstorageService } from "app/common/services/localstorage.service";
import { NotificationService } from "app/common/services/notification.service";
import {ResultViewModel} from "../../../../../models/result-view-model";
import EventTicketDTO from "../../../../../models/event/eventTicketDTO";
import {EventService} from "../../../../services/event-service/event.service";
import EventTicketIssuedDTO from "../../../../../models/event/eventTicketIssuedDTO";


@Component({
  selector: "app-event-ticket-issue-popup",
  templateUrl: "./event-ticket-issue-popup.component.html",
})
export class EventTicketIssuePopupComponent extends BaseComponent implements OnInit {

  private ngUnsubscribe$ = new Subject<void>();
  private resultViewModel: ResultViewModel = new ResultViewModel();
  public issueTicketForm: FormGroup;
  public intervals: LableValueModel[] = [];
  public isLoading: boolean;

  public availableTicketOptions: EventTicketDTO[];

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

  buttonText = "Issue a ticket";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EventTicketIssuePopupComponent>,
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
    this.getEventTickets(this.data.eventId);
    this.buildTicketTypeForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  getEventTickets(eventId) {
    this.eventService.getEventTicketsById(eventId)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          Object.assign(this.resultViewModel, response);
          this.availableTicketOptions = this.resultViewModel.result;
        })
  }

  buildTicketTypeForm(eventTicketIssuedDTO: EventTicketIssuedDTO) {
    const isUpdate = !this.data.isNew;
    this.issueTicketForm = this.formBuilder.group({
      id: [isUpdate ? eventTicketIssuedDTO.id : null, isUpdate ? Validators.required : []],
      encryptedId: [isUpdate ? eventTicketIssuedDTO.encryptedId : null, isUpdate ? Validators.required : []],
      name: [eventTicketIssuedDTO.name || "", [Validators.required, Validators.minLength(3)],],
      phoneNumber: [eventTicketIssuedDTO.phoneNumber || ""],
      emailId: [eventTicketIssuedDTO.emailId || "", Validators.required],
      ticketPurchased: [eventTicketIssuedDTO.ticketPurchased || "", [Validators.required, positiveNumberValidator]],
      smsTicket: new FormControl(false),
      emailTicket: new FormControl(false),
      ticketId: [eventTicketIssuedDTO.ticketId || "", [Validators.required, positiveNumberValidator]],
      couponId: [eventTicketIssuedDTO.couponId || "", [Validators.required, positiveNumberValidator]]
    });
  }

  submit(eventTicketIssuedDTO: EventTicketIssuedDTO) {

    console.log(eventTicketIssuedDTO)

      eventTicketIssuedDTO.emailTicket = eventTicketIssuedDTO.emailTicket ? "Y" : "N";
      eventTicketIssuedDTO.smsTicket = eventTicketIssuedDTO.smsTicket ? "Y" : "N";

    if (this.issueTicketForm.valid) {
      const issueTicketData = this.issueTicketForm.value;
        eventTicketIssuedDTO.encryptedEventId = this.data.eventId
      if (this.data.isNew){
        this.eventService.addEventTicketIssue(issueTicketData)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
              if (response.success){
                this.notificationService.showSuccess(
                    response.messages[0].message
                )
                this.dialogRef.close(response);
              }
              else {
                this.notificationService.showError(response.messages[0].message);
              }
            })
      } else {
        this.eventService
              .editEventTicketIssue(eventTicketIssuedDTO)
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
    return { positiveNumber: true };
  }
  return null;
}
