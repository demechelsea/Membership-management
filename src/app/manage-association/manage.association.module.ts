import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SoraxCommonModule } from 'app/common/sorax-common.module';

import { ManageAssociationRoutes } from './manage.association.routing';
import { SearchAssociationComponent } from './components/search-association/search-association.component';
import { CreateAssociationComponent } from './components/create-association/create-association.component';
import { SelectAssociationComponent } from './components/select-association/select-association.component';

@NgModule({
  imports: [
    CommonModule,
    SoraxCommonModule,
    RouterModule.forChild(ManageAssociationRoutes)
  ],
  declarations: [
    SearchAssociationComponent,
    CreateAssociationComponent,
    SelectAssociationComponent
  ], 
  exports: []
})
export class ManageAssociationModule {

}