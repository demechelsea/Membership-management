import {Component, Input, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SoraxAnimations} from "app/common/animations/sorax-animations";
import {AppLoaderService} from "app/common/services/app-loader.service";
import {BaseComponent} from "app/core/components/base/base.component";
import {Subject, takeUntil} from "rxjs";
import {EventTicketPopupComponent} from "../event-ticket-popup/event-ticket-popup.component";
import {ResultViewModel} from "../../../../../models/result-view-model";
import EventTicketDTO from "../../../../../models/event/eventTicketDTO";
import {SoraxColumnDefinition} from "../../../../../common/components/sorax-table-view/sorax-column-definition";
import {EventService} from "../../../../services/event-service/event.service";

@Component({
    selector: "app-event-ticket-list",
    templateUrl: "./event-ticket-list.component.html",
    styleUrls: ["./event-ticket-list.component.scss"],
    animations: SoraxAnimations,
})
export class EventTicketListComponent extends BaseComponent implements OnInit {
    private ngUnsubscribe$ = new Subject<void>();

    @Input("eventId") eventId: string;
    resultViewModel: ResultViewModel = new ResultViewModel();
    ticketList: EventTicketDTO[]

    public eventTicketColumns: SoraxColumnDefinition[];

    constructor(
        private dialog: MatDialog,
        private loader: AppLoaderService,
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

    getTicketsByEventId(eventId: string) {
        this.loader.open();

        this.eventService.getEventTicketsById(eventId)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
                Object.assign(this.resultViewModel, response);
                this.ticketList = this.resultViewModel.result;
                this.loader.close();
            })
    }

    openPopUp(data: EventTicketDTO, isNew?: boolean) {
        let title = isNew ? "Add a Ticket Type " : "Edit a Ticket Type";
        let dialogRef: MatDialogRef<any> = this.dialog.open(
            EventTicketPopupComponent,
            {
                width: "720px",
                disableClose: true,
                data: {title: title, payload: data, isNew: isNew, eventId: this.eventId},
            }
        );
        dialogRef.afterClosed().subscribe((res) => {

            if (!res) return;

            if (!this.ticketList) this.ticketList = [];

            if (res.isNew){
                this.ticketList = [...this.ticketList, res.data];
            } else {
                const index = this.ticketList.findIndex((t => t.id == res.data.id));
                this.ticketList[index] = res.data;
                this.ticketList = Object.assign([], this.ticketList);
            }
        });
    }

    executeRowActions(rowData: EventTicketDTO) {
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
                name: "Price Per Ticket",
                dataKey: "ticketPrice",
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
