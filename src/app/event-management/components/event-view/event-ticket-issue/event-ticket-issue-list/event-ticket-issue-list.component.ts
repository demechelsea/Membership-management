import {Component, Input, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SoraxAnimations} from "app/common/animations/sorax-animations";
import {BaseComponent} from "app/core/components/base/base.component";
import {Subject, takeUntil} from "rxjs";
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

    @Input("eventId") eventId: string;
    resultViewModel: ResultViewModel = new ResultViewModel();
    ticketIssuedList: EventTicketIssuedDTO[]

    public ticketIssuedColumns: SoraxColumnDefinition[];

    constructor(
        private dialog: MatDialog,
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

    getTicketIssuedByEventId(eventId: string) {
        this.eventService.getEventTicketsIssuedByEventId(eventId)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
                Object.assign(this.resultViewModel, response);
                this.ticketIssuedList = this.resultViewModel.result;
            })
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
            if (!res) return;

            if (!this.ticketIssuedList) this.ticketIssuedList = [];

            if (res.isNew){
                this.ticketIssuedList = [...this.ticketIssuedList, res.data];
            } else {
                const index = this.ticketIssuedList.findIndex((t => t.id == res.data.id));
                this.ticketIssuedList[index] = res.data;
                this.ticketIssuedList = Object.assign([], this.ticketIssuedList);
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
