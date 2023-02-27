import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';

import { AssociationSettingsRoutes } from './association.settings.routing';
import { CommitteeComponent } from './components/committee/committee.component';
import { MembershipPlanComponent } from 'app/association-settings/components/membership-plan/membership-plan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/shared/shared.module';
import { SoraxCommonModule } from 'app/common/sorax-common.module';
import { MembershipPlanPopupComponent } from './components/membership-plan/membership-popup/membership-plan-popup.component';
import { AppConfirmService } from 'app/common/services/app-confirm.service';

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
