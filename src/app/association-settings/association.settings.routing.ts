import { Routes } from '@angular/router';

import { CommitteeComponent } from './components/committee/committee.component';
import { MembershipPlanComponent } from 'app/association-settings/components/membership-plan/membership-plan.component';
import { VisibilitySettingsComponent } from './components/visibility-settings/visibilitySettings.component';
import { EmailComponent } from './components/email-settings/email.component';
import { SmsComponent } from './components/sms-settings/sms.component';
import { PoliciesAndDocstoreComponent } from './components/policies-and-Docstore/policiesAndDocstore.component';
import { DigitalIdCardComponent } from './components/digital-Id-card/digitalIdCard.component';



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
    data: { title: 'SMS Settings', breadcrumb: 'SMS Settings' }
  },
  {
    path: 'PoliciesAndDocstore', component: PoliciesAndDocstoreComponent,
    data: { title: 'Policies and Docstore', breadcrumb: 'Policies and Docstore' }
  },
  {
    path: 'visibilitySettings', component: VisibilitySettingsComponent,
    data: { title: 'Visibility Settings', breadcrumb: 'Visibility Settings' }
  },
  {
    path: 'digitalIdCardSettings', component: DigitalIdCardComponent,
    data: { title: 'Digital Id Card Settings', breadcrumb: 'Digital Id Card Settings' }
  }

];