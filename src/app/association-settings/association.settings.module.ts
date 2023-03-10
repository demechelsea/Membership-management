import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MembershipPlanComponent } from 'app/association-settings/components/membership-plan/membership-plan.component';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { SoraxCommonModule } from 'app/common/sorax-common.module';

import { AssociationSettingsRoutes } from './association.settings.routing';
import { CommitteeComponent } from './components/committee/committee.component';
import { MembershipPlanPopupComponent } from './components/membership-plan/membership-popup/membership-plan-popup.component';

const declarationsList = [
  MembershipPlanComponent,
  MembershipPlanPopupComponent,
  CommitteeComponent,
];

const importsList = [
  SoraxCommonModule,
  RouterModule.forChild(AssociationSettingsRoutes)
];

const providerList = [
  AppConfirmService,
  
];

@NgModule({
  imports: importsList,
  providers: providerList,
  declarations: declarationsList
})
export class AssociationSettingsModule { }
