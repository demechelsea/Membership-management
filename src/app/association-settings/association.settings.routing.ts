import { Routes } from '@angular/router';

import { CommitteeComponent } from './components/committee/committee.component';
import { MembershipPlanComponent } from 'app/association-settings/components/membership-plan/membership-plan.component';



export const AssociationSettingsRoutes: Routes = [
  { path: 'membershipPlan', component: MembershipPlanComponent,
  data: { title: 'Membership Settings', breadcrumb: 'Membership Settings'}
 },
  { path: 'committee', component: CommitteeComponent }
];