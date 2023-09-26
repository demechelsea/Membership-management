import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppConfirmService } from "app/common/services/app-confirm.service";
import { SoraxCommonModule } from "app/common/sorax-common.module";

import { AppFormsModule } from "app/views/forms/forms.module";
import { MembershipManagementRoutes } from "./membership.management.routing";
import { DatePipe } from "@angular/common";
import { MembershipManagementComponent } from "./component/membership-plan/membership-management.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AssociationMemberPopupComponent } from "./component/membership-plan/membership-management-popup/membership-management-popup.component";
import { ProfileHighlightComponent } from "./component/profile-highlight/profile-highlight.component";
import { MembershipDetailsComponent } from "./component/membership-details/membership-details.component";
import { MyFamilyComponent } from "./component/my-family/my-family.component";
import { ContactsComponent } from "./component/contacts/contacts.component";
import { InvoicesComponent } from "./component/invoices/invoices.component";
import { AddressComponent } from "./component/address/address.component";
import { MycompaniesComponent } from "./component/my-companies/my-companies.component";
import { MyfamilyPopupComponent } from "./component/my-family/my-family-popup/my-family-popup.component";
import { MycompaniesPopupComponent } from "./component/my-companies/my-companies-popup/my-companies-popup.component";
import { MembershipDetailsPopupComponent } from "./component/membership-details/membership-details-popup/membership-details-popup.component";
import { ProfilehighlightPopupComponent } from "./component/profile-highlight/profile-highlight-popup/profie-highlight-popup.component";
import { ContactDetailsPopupComponent } from "./component/contacts/contact-details-popup/contact-details-popup.component";
import { AddressPopupComponent } from "./component/address/address-popup/address-popup.component";
import { MyEducationComponent } from "./component/my-education/my-education.component";
import { MyEducationPopupComponent } from "./component/my-education/my-education-popup/my-education-popup.component";
import { WorkExperienceComponent } from "./component/work-experience/work-experience.component";
import { WorkExperiencePopupComponent } from "./component/work-experience/work-experience-popup/work-experience-popup.component";

const declarationsList = [
  MembershipManagementComponent,
  AssociationMemberPopupComponent,
  ProfileHighlightComponent,
  MembershipDetailsComponent,
  MyFamilyComponent,
  ContactsComponent,
  ContactDetailsPopupComponent,
  InvoicesComponent,
  AddressComponent,
  AddressPopupComponent,
  MycompaniesComponent,
  MyfamilyPopupComponent,
  MycompaniesPopupComponent,
  MembershipDetailsPopupComponent,
  ProfilehighlightPopupComponent,
  MyEducationComponent,
  MyEducationPopupComponent,
  WorkExperiencePopupComponent,
  WorkExperienceComponent
];

const importsList = [
  SoraxCommonModule,
  RouterModule.forChild(MembershipManagementRoutes),
  DragDropModule,
  AppFormsModule,
];

const providerList = [AppConfirmService, DatePipe];

@NgModule({
  imports: importsList,
  providers: providerList,
  declarations: declarationsList,
})
export class MembershipManagementModule {}
