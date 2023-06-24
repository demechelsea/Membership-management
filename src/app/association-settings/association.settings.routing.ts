import { Routes } from '@angular/router';

import { CommitteeComponent } from './components/committee/committee.component';
import { MembershipPlanComponent } from 'app/association-settings/components/membership-plan/membership-plan.component';
import { EmailComponent } from './components/email settings/email.component';
import { SmsComponent } from './components/sms settings/sms.component';



export const AssociationSettingsRoutes: Routes = [
  {
    path: 'membershipPlan', component: MembershipPlanComponent,
    data: { title: 'Membership Settings', breadcrumb: 'Membership Settings' }
  },
  {
    path: 'committee', component: CommitteeComponent,
    data: { title: 'Committee Settings', breadcrumb: 'Committee Settings' }
  },
  {
    path: 'emailSetting', component: EmailComponent,
    data: { title: 'Email Settings', breadcrumb: 'Email Settings' }
  },
  {
    path: 'smsSetting', component: SmsComponent,
    data: { title: 'Email Settings', breadcrumb: 'Email Settings' }
  }

];