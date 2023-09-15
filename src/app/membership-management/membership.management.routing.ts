import { Routes } from '@angular/router';
import { MembershipManagementComponent } from './component/membership-plan/membership-management.component';
import { ProfileHighlightComponent } from './component/profile-highlight/profile-highlight.component';



export const MembershipManagementRoutes: Routes = [
  {
    path: 'membershipManagement', component: MembershipManagementComponent,
    data: { title: 'Membership Settings', breadcrumb: 'Membership Management' }
  },
  {
    path: 'profileHighlight', component: ProfileHighlightComponent,
    data: { title: 'Profile Highlight', breadcrumb: 'Profile Highlight' }
  },
];