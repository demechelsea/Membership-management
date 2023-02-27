import { Routes } from '@angular/router';
import { SoraxAuthGuard } from 'app/core/guards/sorax-auth-guard.service';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


export const DashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [SoraxAuthGuard],
    data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
  },
  
];
