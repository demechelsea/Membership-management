import { Routes } from '@angular/router';
import {EventListComponent} from "./components/event-list/event-list.component";
import {EventViewComponent} from "./components/event-view/event-view.component";

export const EventManagementRoutes: Routes = [
  {
    path: 'events', component: EventListComponent,
    data: { title: 'Event Management', breadcrumb: 'List events' }
  },
  {
    path: 'events/view/:id', component: EventViewComponent,
    data: { title: 'Event Management', breadcrumb: 'View event' }
  }
];
