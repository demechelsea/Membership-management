import { Routes } from '@angular/router';
import {EventListComponent} from "./components/event-list/event-list.component";

export const EventManagementRoutes: Routes = [
  {
    path: 'viewEvents', component: EventListComponent,
    data: { title: 'Event Management', breadcrumb: 'List events' }
  }
];
