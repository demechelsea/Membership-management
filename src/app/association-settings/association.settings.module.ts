import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MembershipPlanComponent } from 'app/association-settings/components/membership-plan/membership-plan.component';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { SoraxCommonModule } from 'app/common/sorax-common.module';

import { AssociationSettingsRoutes } from './association.settings.routing';
import { CommitteeComponent } from './components/committee/committee.component';
import { MembershipPlanPopupComponent } from './components/membership-plan/membership-popup/membership-plan-popup.component';
import { CommitteePopupComponent } from './components/committee/committee-popup/committee-popup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PositionPopupComponent } from './components/committee/position-popup/position-popup.component';
import { DatePipe } from '@angular/common';
import { DetailsComponent } from './components/committee/committee-details/committee-details.component';
import { CommitteeMemberPopupComponent } from './components/committee/committee-details/committee-member-popup/committee-member-popup.component';
import { AttachmentPopupComponent } from './components/committee/committee-details/attachment-popup/attachment-popup.component';


const declarationsList = [
  MembershipPlanComponent,
  MembershipPlanPopupComponent,
  CommitteeComponent,
  CommitteePopupComponent,
  PositionPopupComponent,
  DetailsComponent,
  CommitteeMemberPopupComponent,
  AttachmentPopupComponent
];

const importsList = [
  SoraxCommonModule,
  RouterModule.forChild(AssociationSettingsRoutes),
  DragDropModule,
];

const providerList = [
  AppConfirmService,DatePipe
];

@NgModule({
  imports: importsList,
  providers: providerList,
  declarations: declarationsList
})
export class AssociationSettingsModule { }
