import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';

import { AssociationDashboardComponent } from './components/association-dashboard/association-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SoraxFormFieldComponent } from './components/sorax-form-field/sorax-form-field.component';
import { SoraxTableViewComponent } from './components/sorax-table-view/sorax-table-view.component';
import { TaskComponent } from './components/task/task.component';
import { UnderdevComponent } from './components/underdev/underdev.component';
import { AlertMessageDirective } from './directives/alert-message.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { ValidationDisplayDirective } from './directives/validation-display.directive';


@NgModule({
  declarations: [
    TaskComponent,
    AssociationDashboardComponent,
    PageNotFoundComponent,
    AlertMessageDirective,
    SoraxFormFieldComponent,
    ValidationDisplayDirective,
    NumberOnlyDirective,
    UnderdevComponent,
    SoraxTableViewComponent,
  ],
  imports: [
    CommonModule,
          
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule, 
    SharedDirectivesModule,
    SharedComponentsModule,

    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSortModule,
    NgxDatatableModule,
    
    
  ],
  exports:[
    AssociationDashboardComponent,
    PageNotFoundComponent,
    SoraxFormFieldComponent,
    AlertMessageDirective,
    ValidationDisplayDirective,
    NumberOnlyDirective,
    SoraxTableViewComponent,
    
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule, 
    SharedDirectivesModule,
    SharedComponentsModule, 

    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSortModule,
    NgxDatatableModule,
  ]
})
export class SoraxCommonModule { }
