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
import { MembershipDetailsComponent } from './component/membership-details/membership-details.component';
import { MyFamilyComponent } from './component/my-family/my-family.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { InvoicesComponent } from './component/invoices/invoices.component';
import { AddressComponent } from './component/address/address.component';
import { MycompaniesComponent } from './component/my-companies/my-companies.component';
import { MyfamilyPopupComponent } from './component/my-family/my-family-popup/my-family-popup.component';
import { MycompaniesPopupComponent } from './component/my-companies/my-companies-popup/my-companies-popup.component';
import { MembershipDetailsPopupComponent } from './component/membership-details/membership-details-popup/membership-details-popup.component';


const declarationsList = [
  MembershipManagementComponent,
  AssociationMemberPopupComponent,
  ProfileHighlightComponent,
  MembershipDetailsComponent,
  MyFamilyComponent,
  ContactsComponent,
  InvoicesComponent,
  AddressComponent,
  MycompaniesComponent,
  MyfamilyPopupComponent,
  MycompaniesPopupComponent,
  MembershipDetailsPopupComponent
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
