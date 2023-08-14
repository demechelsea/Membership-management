import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppConfirmService} from 'app/common/services/app-confirm.service';
import {SoraxCommonModule} from 'app/common/sorax-common.module';
import {AngularEditorModule} from '@kolkov/angular-editor';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {DatePipe} from '@angular/common';
import {AppFormsModule} from 'app/views/forms/forms.module';
import {EventManagementRoutes} from "./event.management.routing";
import {EventListComponent} from "./components/event-list/event-list.component";
import {EventCardComponent} from "./components/event-list/event-card/event-card.component";
import {EventPopupComponent} from "./components/event-popup/event-popup.component";
import {EventViewComponent} from "./components/event-view/event-view.component";
import {
    EventTicketListComponent
} from './components/event-view/event-ticket/event-ticket-list/event-ticket-list.component';
import {
    EventTicketPopupComponent
} from "./components/event-view/event-ticket/event-ticket-popup/event-ticket-popup.component";
import {
    EventTicketIssuePopupComponent
} from "./components/event-view/event-ticket-issue/event-ticket-issue-popup/event-ticket-issue-popup.component";
import {
    EventTicketIssueListComponent
} from "./components/event-view/event-ticket-issue/event-ticket-issue-list/event-ticket-issue-list.component";
import {
    EventSponsorListComponent
} from "./components/event-view/event-sponsors/event-sponsor-list/event-sponsor-list.component";
import {
    EventSponsorPopupComponent
} from "./components/event-view/event-sponsors/event-sponsor-popup/event-sponsor-popup.component";
import {
    EventSponsorCardComponent
} from "./components/event-view/event-sponsors/event-sponsor-list/event-sponsor-card/event-sponsor-card.component";
import {
    AddCompanyPopupComponent
} from "./components/event-view/event-sponsors/event-sponsor-list/add-company-popup/add-company-popup.component";
import {
    EventProgramListComponent
} from "./components/event-view/event-program/event-program-list/event-program-list.component";
import {
    EventProgramPopupComponent
} from "./components/event-view/event-program/event-program-popup/event-program-popup.component";
import {
    EventGalleryListComponent
} from "./components/event-view/event-gallery/event-gallery-list/event-gallery-list.component";
import {
    EventGalleryPopupComponent
} from "./components/event-view/event-gallery/event-gallery-popup/event-gallery-popup.component";
import {QuillModule} from "ngx-quill";
import {CouponListComponent} from "./components/coupon-list/coupon-list.component";
import {CouponPopupComponent} from "./components/coupon-popup/coupon-popup.component";
import {PastEventListComponent} from "./components/past-event-list/past-event-list.component";

const declarationsList = [
    EventListComponent,
    EventCardComponent,
    EventPopupComponent,
    EventViewComponent,
    EventTicketListComponent,
    EventTicketPopupComponent,
    EventTicketIssueListComponent,
    EventTicketIssuePopupComponent,
    EventSponsorListComponent,
    EventSponsorPopupComponent,
    EventSponsorCardComponent,
    AddCompanyPopupComponent,
    EventProgramListComponent,
    EventProgramPopupComponent,
    EventGalleryListComponent,
    EventGalleryPopupComponent,
    PastEventListComponent,

    CouponListComponent,
    CouponPopupComponent
];

const importsList = [
    SoraxCommonModule,
    RouterModule.forChild(EventManagementRoutes),
    DragDropModule,
    AppFormsModule,
    AngularEditorModule
];

const providerList = [
    AppConfirmService, DatePipe
];

@NgModule({
    imports: [
        importsList,
        QuillModule
    ],
    providers: providerList,
    declarations: declarationsList
})
export class EventManagementModule {
}
