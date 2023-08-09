import {ChangeDetectorRef, Component, Inject, OnInit} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LookupService} from "app/common/services/lookup.service";
import {BaseComponent} from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import {Observable, Subject, takeUntil} from "rxjs";
import {LocalstorageService} from "app/common/services/localstorage.service";
import {NotificationService} from "app/common/services/notification.service";
import {EventService} from "../../../../services/event-service/event.service";
import EventTicketDTO from "../../../../../models/event/eventTicketDTO";
import EventProgramDTO from "../../../../../models/event/eventProgramDTO";
import EventGalleryDTO from "../../../../../models/event/eventGalleryDTO";

@Component({
    selector: "app-event-gallery-popup",
    templateUrl: "./event-gallery-popup.component.html",
})
export class EventGalleryPopupComponent extends BaseComponent implements OnInit {
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
