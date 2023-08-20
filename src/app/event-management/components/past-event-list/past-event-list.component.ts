import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SoraxAnimations} from 'app/common/animations/sorax-animations';
import {SoraxColumnDefinition} from 'app/common/components/sorax-table-view/sorax-column-definition';
import {BaseComponent} from 'app/core/components/base/base.component';
import {ResultViewModel} from 'app/models/result-view-model';
import {Subject, takeUntil} from 'rxjs';
import CouponDTO from "../../../models/CouponDTO";
import {CouponService} from "../../services/event-service/coupon.service";
import {CouponPopupComponent} from "../coupon-popup/coupon-popup.component";
import {EventService} from "../../services/event-service/event.service";
import EventDTO from "../../../models/event/eventDTO";

@Component({
    selector: 'sorax-past-event-list',
    templateUrl: './past-event-list.component.html',
    styleUrls: ['./past-event-list.component.scss'],
    animations: SoraxAnimations,
})
export class PastEventListComponent extends BaseComponent implements OnInit {

    private ngUnsubscribe$ = new Subject<void>();
    resultViewModel: ResultViewModel = new ResultViewModel();
    eventList: EventDTO[]

    public pastEventsColumns: SoraxColumnDefinition[];

    constructor(
        private dialog: MatDialog,
        private eventService: EventService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initializeColumns();
        this.getPastEvents();
    }

    getPastEvents(){
        this.eventService.getPastEvents()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
                Object.assign(this.resultViewModel, response);
                this.eventList = this.resultViewModel.result;
            })
    }

    openPopUp(data: CouponDTO, isNew?: boolean) {
        let title = isNew ? "Add Coupon" : "Edit Coupon";
        let dialogRef: MatDialogRef<any> = this.dialog.open(
            CouponPopupComponent,
            {
                width: "720px",
                disableClose: true,
                data: {title: title, payload: data, isNew: isNew},
            }
        );
        dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
                return;
            }
        });
    }

    executeRowActions(rowData: CouponDTO) {
        if (rowData.performAction == "Edit") {
            this.openPopUp(rowData, false);
        }
    }

    initializeColumns(): void {
        this.pastEventsColumns = [
            {
                name: "Event Date",
                dataKey: "startDate",
                position: "left",
                dataType: "Date",
                isSortable: true,

            },
            {
                name: "Event Name",
                dataKey: "name",
                position: "left",
                isSortable: true,
                link: true,
                clickEvent: (data) => {
                    this.openPopUp(data, false);
                }
            },
            {
                name: "#People Attended",
                dataKey: "peopleAllowedPerTicket",
                position: "left",
                isSortable: true,
            },
            {
                name: "Shown to public",
                dataKey: "availableToPublic",
                position: "left",
                isSortable: true
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
            }
        ];
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
