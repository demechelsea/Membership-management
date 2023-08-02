import {Component, Input, OnInit, ViewChild} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { Subject, takeUntil } from "rxjs";
import {Router} from "@angular/router";
import MemershipPlanModel from "../../../../models/membershipPlanModel";
import {
  MembershipPlanPopupComponent
} from "../../../../association-settings/components/membership-plan/membership-popup/membership-plan-popup.component";
import {SoraxColumnDefinition} from "../../../../common/components/sorax-table-view/sorax-column-definition";
import {EventService} from "../../../services/event-service/event.service";
import {ResultViewModel} from "../../../../models/result-view-model";
import EventDTO from "../../../../models/event/eventDTO";
import EventTicketDTO from "../../../../models/event/eventTicketDTO";
import EventTicketModel from "../../../../models/event/eventTicketModel";
import {EventTicketPopupComponent} from "../event-ticket-popup/event-ticket-popup.component";

@Component({
  selector: "app-event-ticket-list",
  templateUrl: "./event-ticket-list.component.html",
  styleUrls: ["./event-ticket-list.component.scss"],
  animations: SoraxAnimations,
})
export class EventTicketListComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  @Input("eventId") eventId: number;
  resultViewModel: ResultViewModel = new ResultViewModel();
  ticketList: EventTicketDTO[]

  public membershipPlanData: any;
  public eventTicketColumns: SoraxColumnDefinition[];

  constructor(
      private dialog: MatDialog,
      private notificationService: NotificationService,
      private loader: AppLoaderService,
      private router: Router,
      private eventService: EventService
  ) {
    super();
  }
  ngOnInit(): void {
    if (this.eventId) {
      this.initializeColumns();
      this.getTicketsByEventId(this.eventId);
    }
  }

  getTicketsByEventId(eventId) {
    this.loader.open();
    this.eventService.getEventTicketsById(eventId)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          Object.assign(this.resultViewModel, response);
          console.log(this.resultViewModel);
          this.ticketList = this.resultViewModel.result;
          this.loader.close();
        })
  }

  openEvent(eventId) {
    this.router.navigateByUrl("event-management/events/view/" + eventId);
  }

  openPopUp(data: EventTicketModel, isNew?: boolean) {
    let title = isNew ? "Add a Ticket Type " : "Edit a Ticket Type";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
        EventTicketPopupComponent,
        {
          width: "720px",
          disableClose: true,
          data: { title: title, payload: data, isNew: isNew, eventId: this.eventId },
        }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      // this.getPageResults();
    });
  }

  executeRowActions(rowData: EventTicketModel) {
    if (rowData.performAction == "Edit") {
      this.openPopUp(rowData, false);
    }
  }

  initializeColumns(): void {
    this.eventTicketColumns = [
      {
        name: "Ticket Type Name",
        dataKey: "name",
        position: "left",
        isSortable: true,
        link: true,
        clickEvent: (data) => {
          this.openPopUp(data, false);
        },
      },
      {
        name: "Ticket Type",
        dataKey: "ticketType",
        position: "left",
        isSortable: true,
      },
      {
        name: "TicketsAvailable",
        dataKey: "numberOfTickets",
        position: "left",
        isSortable: true,
      },
      {
        name: "People Allowed Per Ticket",
        dataKey: "peopleAllowedPerTicket",
        position: "left",
        isSortable: true,
      },
      {
        name: "Admin Issue",
        dataKey: "adminIssue",
        position: "left",
        isSortable: true,
      },
      {
        name: "Visible To Public?",
        dataKey: "visibleToPublic",
        position: "left",
        isSortable: false,
      },
      {
        name: "Action",
        dataKey: "action",
        position: "left",
        isSortable: false,
      },
    ];
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
