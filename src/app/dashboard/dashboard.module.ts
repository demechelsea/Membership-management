import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SoraxCommonModule } from 'app/common/sorax-common.module';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    SoraxCommonModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    AdminDashboardComponent,
  ], 
  exports: []
})
export class DashboardModule {

}