import { Routes } from '@angular/router';
import { MembershipManagementComponent } from './component/membership-plan/membership-plan.component';



export const MembershipManagementRoutes: Routes = [
  {
    path: 'membershipManagement', component: MembershipManagementComponent,
    data: { title: 'Membership Settings', breadcrumb: 'Membership Management' }
  },
];