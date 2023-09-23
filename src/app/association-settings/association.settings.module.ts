import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { SoraxCommonModule } from 'app/common/sorax-common.module';

import { AssociationSettingsRoutes } from './association.settings.routing';
import { CommitteeComponent } from './components/committee/committee.component';
import { MembershipPlanPopupComponent } from './components/membership-plan/membership-popup/membership-plan-popup.component';
import { CommitteePopupComponent } from './components/committee/committee-popup/committee-popup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PositionPopupComponent } from './components/committee/position-popup/position-popup.component';
import { DatePipe } from '@angular/common';
import { MembershipPlanComponent } from 'app/association-settings/components/membership-plan/membership-plan.component';
import { DetailsComponent } from './components/committee/committee-details/committee-details.component';
import { CommitteeMemberPopupComponent } from './components/committee/committee-details/committee-member-popup/committee-member-popup.component';
import { AttachmentPopupComponent } from './components/committee/committee-details/attachment-popup/attachment-popup.component';
import { DigitalIdCardComponent } from './components/digital-Id-card/digitalIdCard.component';
import { EmailComponent } from './components/email-settings/email.component';
import { SmsComponent } from './components/sms-settings/sms.component';
import { SMTPPopupComponent } from './components/email-settings/SMTP-popup/SMTP-popup.component';
import { EmailSendersProfilePopupComponent } from './components/email-settings/emailSendersProfile-Popup/emailSendersProfile-Popup.component';
import { EmailTemplatePopupComponent } from './components/email-settings/emailTemplate-Popup/emailTemplate-Popup.component';
import { PoliciesAndDocstoreComponent } from './components/policies-and-Docstore/policiesAndDocstore.component';
import { SMSSenderProfilePopupComponent } from './components/sms-settings/SMS-senders-profile-popup/SMSsenderProfile-popup.component';
import { SMSTemplatePopupComponent } from './components/sms-settings/smsTemplate-Popup/smsTemplate-Popup.component';
import { PoliciesAndDocstorePopupComponent } from './components/policies-and-Docstore/policiesAndDocstore-popup/policiesAndDocstore.component';
import { VisibilitySettingsComponent } from './components/visibility-settings/visibilitySettings.component';
import { AppFormsModule } from 'app/views/forms/forms.module';
import { QuillModule } from 'ngx-quill';


const declarationsList = [
  MembershipPlanComponent,
  MembershipPlanPopupComponent,
  CommitteeComponent,
  CommitteePopupComponent,
  PositionPopupComponent,
  DetailsComponent,
  CommitteeMemberPopupComponent,
  AttachmentPopupComponent,
  EmailComponent,
  SmsComponent,
  SMTPPopupComponent,
  EmailSendersProfilePopupComponent,
  EmailTemplatePopupComponent,
  SMSSenderProfilePopupComponent,
  PoliciesAndDocstoreComponent,
  SMSTemplatePopupComponent,
  PoliciesAndDocstorePopupComponent,
  VisibilitySettingsComponent,
  DigitalIdCardComponent
];

const importsList = [
  SoraxCommonModule,
  RouterModule.forChild(AssociationSettingsRoutes),
  DragDropModule,
  AppFormsModule,
  QuillModule
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
