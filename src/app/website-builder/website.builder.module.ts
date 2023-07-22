import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SoraxCommonModule } from 'app/common/sorax-common.module';

import { BuilderComponent } from './component/builder/builder.component';
import { WebsiteBuilderRoutes } from './website.builder.routing';
import { SiteListComponent } from './component/site-list/site-list.component';

const declarationsList = [
  BuilderComponent,
  SiteListComponent,
];

const importsList = [
  SoraxCommonModule,
  RouterModule.forChild(WebsiteBuilderRoutes)
];

const providerList = [
];

@NgModule({
  imports: importsList,
  providers: providerList,
  declarations: declarationsList
})
export class WebsiteBuilderModule { }
