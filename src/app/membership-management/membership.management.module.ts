import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { SoraxCommonModule } from 'app/common/sorax-common.module';


import { AppFormsModule } from 'app/views/forms/forms.module';
import { MembershipManagementRoutes } from './membership.management.routing';
import { DatePipe } from '@angular/common';
import { MembershipManagementComponent } from './component/membership-plan/membership-management.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AssociationMemberPopupComponent } from './component/membership-plan/membership-popup/membership-management-popup.component';
import { ProfileHighlightComponent } from './component/profile-highlight/profile-highlight.component';


const declarationsList = [
  MembershipManagementComponent,
  AssociationMemberPopupComponent,
  ProfileHighlightComponent
];

const importsList = [
  SoraxCommonModule,
  RouterModule.forChild(MembershipManagementRoutes),
  DragDropModule,
  AppFormsModule,
];

const providerList = [
  AppConfirmService,DatePipe
];

@NgModule({
  imports: importsList,
  providers: providerList,
  declarations: declarationsList
})
export class MembershipManagementModule { }
