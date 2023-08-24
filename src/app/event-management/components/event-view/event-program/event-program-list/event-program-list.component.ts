import {Component, Input, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SoraxAnimations} from "app/common/animations/sorax-animations";
import {AppLoaderService} from "app/common/services/app-loader.service";
import {NotificationService} from "app/common/services/notification.service";
import {BaseComponent} from "app/core/components/base/base.component";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ResultViewModel} from "../../../../../models/result-view-model";
import EventTicketDTO from "../../../../../models/event/eventTicketDTO";
import {SoraxColumnDefinition} from "../../../../../common/components/sorax-table-view/sorax-column-definition";
import {EventService} from "../../../../services/event-service/event.service";
import {EventProgramPopupComponent} from "../event-program-popup/event-program-popup.component";
import EventProgramDTO from "../../../../../models/event/eventProgramDTO";

@Component({
    selector: "app-event-program-list",
    templateUrl: "./event-program-list.component.html",
    styleUrls: ["./event-program-list.component.scss"],
    animations: SoraxAnimations,
})
export class EventProgramListComponent extends BaseComponent implements OnInit {
    private ngUnsubscribe$ = new Subject<void>();

    @Input("eventId") eventId: string;
    resultViewModel: ResultViewModel = new ResultViewModel();
    programList: EventProgramDTO[]

    public membershipPlanData: any;
    public eventProgramColumns: SoraxColumnDefinition[];

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
            this.getProgramsByEventId(this.eventId);
        }
    }

    getProgramsByEventId(eventId) {
        this.eventService.getEventProgramsByEventId(eventId)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
                Object.assign(this.resultViewModel, response);
                console.log(this.resultViewModel);
                this.programList = this.resultViewModel.result;
            })
    }

    openPopUp(data: EventTicketDTO, isNew?: boolean) {
        let title = isNew ? "Add a Program " : "Edit a Program";
        let dialogRef: MatDialogRef<any> = this.dialog.open(
            EventProgramPopupComponent,
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

    executeRowActions(rowData: EventTicketDTO) {
        if (rowData.performAction == "Edit") {
            this.openPopUp(rowData, false);
        }
    }

    initializeColumns(): void {
        this.eventProgramColumns = [
            {
                name: "Start time",
                dataKey: "startTime",
                position: "left",
                isSortable: true,

            },
            {
                name: "End time",
                dataKey: "endTime",
                position: "left",
                isSortable: true,
            },
            {
                name: "Duration",
                dataKey: "duration",
                position: "left",
                isSortable: true,
            },
            {
                name: "Program Name",
                dataKey: "name",
                position: "left",
                isSortable: true,
                link: true,
                clickEvent: (data) => {
                    this.openPopUp(data, false);
                },
            },
            {
                name: "Contact Person",
                dataKey: "contactPerson",
                position: "left",
                isSortable: true,
            },
            {
                name: "Contact #",
                dataKey: "contactPhone",
                position: "left",
                isSortable: false,
            },
            {
                name: "Status",
                dataKey: "status",
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
