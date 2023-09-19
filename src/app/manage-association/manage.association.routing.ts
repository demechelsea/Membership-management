import { Routes } from '@angular/router';
import { SoraxAuthGuard } from 'app/core/guards/sorax-auth-guard.service';
import { SearchAssociationComponent } from 'app/manage-association/components/search-association/search-association.component';
import { CreateAssociationComponent } from './components/create-association/create-association.component';



export const ManageAssociationRoutes: Routes = [
  {
    path: '',
    component: SearchAssociationComponent,
    canActivate: [SoraxAuthGuard],
    data: { title: 'Search Association', breadcrumb: 'Search Association' }
  },
  {
    path: 'create',
    component: CreateAssociationComponent,
    canActivate: [SoraxAuthGuard],
    data: { title: 'Create a New Association', breadcrumb: 'Create a New Association' }
  },
  
];
