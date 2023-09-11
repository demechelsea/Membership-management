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
import EventProgramDTO from "../../../../../models/event/eventProgramDTO";
import {EventGalleryPopupComponent} from "../event-gallery-popup/event-gallery-popup.component";
import EventGalleryDTO from "../../../../../models/event/eventGalleryDTO";
import {Urls} from "../../../../../common/utils/urls";
import {EventProgramPopupComponent} from "../../event-program/event-program-popup/event-program-popup.component";

@Component({
    selector: "app-event-gallery-list",
    templateUrl: "./event-gallery-list.component.html",
    styleUrls: ["./event-gallery-list.component.scss"],
    animations: SoraxAnimations,
})
export class EventGalleryListComponent extends BaseComponent implements OnInit {

    @Input("eventId") eventId: string;
    private ngUnsubscribe$ = new Subject<void>();

    resultViewModel: ResultViewModel = new ResultViewModel();

    gallery: EventGalleryDTO[] = [];

    constructor(
        private eventService: EventService,
        private notificationService: NotificationService,
        private dialog: MatDialog,
    ) {
        super();
    }

    ngOnInit() {

        if (this.eventId) {
            this.getGalleryByEventId(this.eventId);
        }


    }

    getGalleryByEventId(eventId) {
        this.eventService.getGalleryByEventId(eventId)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
                Object.assign(this.resultViewModel, response);
                this.gallery = this.resultViewModel.result;
                this.gallery.forEach(g => {
                    g.imageVideoLink = Urls.baseAPIUrl + "/" + g.imageVideoLink;
                })
                console.log(this.gallery);
            })
    }

    deleteGallery(galleryId) {
        this.eventService.deleteGalleryByEventId(this.eventId, galleryId)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
                if (response.success) {
                    this.notificationService.showSuccess(
                        response.messages[0].message
                    )
                } else {
                    this.notificationService.showError(response.messages[0].message);
                }
            })
    }

    openPopUp() {
        let title = "Upload Photos";
        let dialogRef: MatDialogRef<any> = this.dialog.open(
            EventGalleryPopupComponent,
            {
                width: "720px",
                disableClose: true,
                data: {title: title, payload: {}, isNew: true, eventId: this.eventId},
            }
        );
        dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
                return;
            }
        });
    }
}
