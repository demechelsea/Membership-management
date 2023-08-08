import {Component, Input, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SoraxAnimations} from "app/common/animations/sorax-animations";
import {AppLoaderService} from "app/common/services/app-loader.service";
import {NotificationService} from "app/common/services/notification.service";
import {BaseComponent} from "app/core/components/base/base.component";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ResultViewModel} from "../../../../../models/result-view-model";
import EventTicketIssuedDTO from "../../../../../models/event/eventTicketIssuedDTO";
import {SoraxColumnDefinition} from "../../../../../common/components/sorax-table-view/sorax-column-definition";
import {EventService} from "../../../../services/event-service/event.service";
import {EventSponsorPopupComponent} from "../event-sponsor-popup/event-sponsor-popup.component";
import EventSponsorDTO from "../../../../../models/event/eventSponsorDTO";

@Component({
    selector: "app-event-sponsor-list",
    templateUrl: "./event-sponsor-list.component.html",
    styleUrls: ["./event-sponsor-list.component.scss"],
    animations: SoraxAnimations,
})
export class EventSponsorListComponent extends BaseComponent implements OnInit {
    private ngUnsubscribe$ = new Subject<void>();

    @Input("eventId") eventId: number;
    resultViewModel: ResultViewModel = new ResultViewModel();
    eventSponsorDTOS: EventSponsorDTO[]

    public eventSponsorsColumns: SoraxColumnDefinition[];

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
            this.getSponsorsByEventId(this.eventId);
        }
    }

    getSponsorsByEventId(eventId) {
        this.eventService
            .getEventSponsorsByEventId(eventId)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
                Object.assign(this.resultViewModel, response);
                this.eventSponsorDTOS = this.resultViewModel.result;
            })
    }

    openEvent(eventId) {
        this.router.navigateByUrl("event-management/events/view/" + eventId);
    }

    openPopUp(data: EventSponsorDTO, isNew?: boolean) {
        let title = isNew ? "Add Sponsor " : "Edit Sponsor";
        let dialogRef: MatDialogRef<any> = this.dialog.open(
            EventSponsorPopupComponent,
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

    executeRowActions(rowData: EventSponsorDTO) {
        if (rowData.performAction == "Edit") {
            this.openPopUp(rowData, false);
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
