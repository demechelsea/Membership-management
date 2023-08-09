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

@Component({
    selector: "app-event-gallery-list",
    templateUrl: "./event-gallery-list.component.html",
    styleUrls: ["./event-gallery-list.component.scss"],
    animations: SoraxAnimations,
})
export class EventGalleryListComponent extends BaseComponent implements OnInit {
    photos = [{
        name: 'Photo 1',
        url: 'assets/images/sq-10.jpg'
    }, {
        name: 'Photo 2',
        url: 'assets/images/sq-16.jpg'
    }, {
        name: 'Photo 3',
        url: 'assets/images/sq-15.jpg'
    }, {
        name: 'Photo 4',
        url: 'assets/images/sq-17.jpg'
    }, {
        name: 'Photo 5',
        url: 'assets/images/sq-13.jpg'
    }, {
        name: 'Photo 6',
        url: 'assets/images/sq-12.jpg'
    }, {
        name: 'Photo 7',
        url: 'assets/images/sq-11.jpg'
    }, {
        name: 'Photo 8',
        url: 'assets/images/sq-10.jpg'
    }]
    constructor() {
        super();
    }

    ngOnInit() {
    }
}
