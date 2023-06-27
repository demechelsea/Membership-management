import { Routes } from '@angular/router';
import { BuilderComponent } from './component/builder/builder.component';


export const WebsiteBuilderRoutes: Routes = [
  {
    path: 'websiteBuilder', component: BuilderComponent,
    data: { title: 'Website Builder', breadcrumb: 'Website Builder' }
  }
];