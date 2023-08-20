import {Component, Input, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SoraxAnimations} from "app/common/animations/sorax-animations";
import {AppLoaderService} from "app/common/services/app-loader.service";
import {NotificationService} from "app/common/services/notification.service";
import {BaseComponent} from "app/core/components/base/base.component";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {EventTicketIssuePopupComponent} from "../event-ticket-issue-popup/event-ticket-issue-popup.component";
import {ResultViewModel} from "../../../../../models/result-view-model";
import EventTicketIssuedDTO from "../../../../../models/event/eventTicketIssuedDTO";
import {SoraxColumnDefinition} from "../../../../../common/components/sorax-table-view/sorax-column-definition";
import {EventService} from "../../../../services/event-service/event.service";

@Component({
    selector: "app-event-ticket-issue-list",
    templateUrl: "./event-ticket-issue-list.component.html",
    styleUrls: ["./event-ticket-issue-list.component.scss"],
    animations: SoraxAnimations,
})
export class EventTicketIssueListComponent extends BaseComponent implements OnInit {
    private ngUnsubscribe$ = new Subject<void>();

    @Input("eventId") eventId: number;
    resultViewModel: ResultViewModel = new ResultViewModel();
    ticketIssuedDTOS: EventTicketIssuedDTO[]

    public ticketIssuedColumns: SoraxColumnDefinition[];

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
            this.getTicketIssuedByEventId(this.eventId);
        }
    }

    getTicketIssuedByEventId(eventId) {
        this.eventService.getEventTicketsIssuedByEventId(eventId)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
                Object.assign(this.resultViewModel, response);
                console.log(this.resultViewModel);
                this.ticketIssuedDTOS = this.resultViewModel.result;
            })
    }

    openEvent(eventId) {
        this.router.navigateByUrl("event-management/events/view/" + eventId);
    }

    openPopUp(data: EventTicketIssuedDTO, isNew?: boolean) {
        let title = isNew ? "Issue a Ticket " : "Edit Ticket Issued";
        let dialogRef: MatDialogRef<any> = this.dialog.open(
            EventTicketIssuePopupComponent,
            {
                width: "720px",
                disableClose: true,
                data: {title: title, payload: data, isNew: isNew, eventId: this.eventId},
            }
        );
        dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
                return;
            }
        });
    }

    executeRowActions(rowData: EventTicketIssuedDTO) {
        if (rowData.performAction == "Edit") {
            this.openPopUp(rowData, false);
        }
    }

    initializeColumns(): void {
        this.ticketIssuedColumns = [
            {
                name: "Date",
                dataKey: "createdOn",
                position: "left",
                dataType: "Date",
                isSortable: true
            },
            {
                name: "Name",
                dataKey: "name",
                position: "left",
                isSortable: true,
                link: true,
                clickEvent: (data) => {
                    this.openPopUp(data, false);
                },
            },
            {
                name: "Ticket Name",
                dataKey: "ticketName",
                position: "left",
                isSortable: true,
            },
            {
                name: "#Ticket Purchased",
                dataKey: "ticketPurchased",
                position: "left",
                isSortable: true,
            },
            {
                name: "Total Amount",
                dataKey: "totalAmount",
                position: "left",
                isSortable: true,
            },
            {
                name: "Status",
                dataKey: "status",
                position: "left",
                isSortable: true,
            },
            {
                name: "Access",
                dataKey: "ticketId",
                position: "left",
                isSortable: true,
            },
            {
                name: "Issue Number",
                dataKey: "issueNumber",
                position: "left",
                isSortable: false,
            },
            {
                name: "Action",
                dataKey: "action",
                position: "left",
                isSortable: false,
            }
        ];
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
