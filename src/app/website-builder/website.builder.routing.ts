import { Routes } from '@angular/router';
import { BuilderComponent } from './component/builder/builder.component';
import { SiteListComponent } from './component/site-list/site-list.component';


export const WebsiteBuilderRoutes: Routes = [
  {
    path: 'viewWebSites', component: SiteListComponent,
    data: { title: 'Website Builder', breadcrumb: 'List sites' }
  },
  {
    path: 'websiteBuilder', component: BuilderComponent,
    data: { title: 'Website Builder', breadcrumb: 'Website Builder' }
  }
];