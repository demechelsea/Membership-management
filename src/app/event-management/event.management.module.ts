import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { SoraxCommonModule } from 'app/common/sorax-common.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { AppFormsModule } from 'app/views/forms/forms.module';
import {EventManagementRoutes} from "./event.management.routing";
import {EventListComponent} from "./components/event-list/event-list.component";
import {EventCardComponent} from "./components/event-card/event-card.component";
import {EventPopupComponent} from "./components/event-popup/event-popup.component";
import {EventViewComponent} from "./components/event-view/event-view.component";
import {EventTicketListComponent} from "./components/event-ticket/event-ticket-list/event-ticket-list.component";
import {EventTicketPopupComponent} from "./components/event-ticket/event-ticket-popup/event-ticket-popup.component";
import {
  EventTicketIssuePopupComponent
} from "./components/event-ticket-issue/event-ticket-issue-popup/event-ticket-issue-popup.component";
import {
  EventTicketIssueListComponent
} from "./components/event-ticket-issue/event-ticket-issue-list/event-ticket-issue-list.component";

const declarationsList = [
  EventListComponent,
  EventViewComponent,
  EventCardComponent,
  EventPopupComponent,
  EventTicketListComponent,
  EventTicketPopupComponent,
  EventTicketIssueListComponent,
  EventTicketIssuePopupComponent
];

const importsList = [
  SoraxCommonModule,
  RouterModule.forChild(EventManagementRoutes),
  DragDropModule,
  AppFormsModule,
  AngularEditorModule
];

const providerList = [
  AppConfirmService,DatePipe
];

@NgModule({
  imports: importsList,
  providers: providerList,
  declarations: declarationsList
})
export class EventManagementModule { }
