import { Routes } from '@angular/router';
import { SearchAssociationComponent } from 'app/manage-association/components/search-association/search-association.component';
import { CreateAssociationComponent } from './components/create-association/create-association.component';
import { SelectAssociationComponent } from './components/select-association/select-association.component';



export const ManageAssociationRoutes: Routes = [
  {
    path: '',
    component: SearchAssociationComponent,
    data: { title: 'Search Association', breadcrumb: 'Search Association' }
  },
  {
    path: 'create',
    component: CreateAssociationComponent,
    data: { title: 'Create a New Association', breadcrumb: 'Create a New Association' }
  },
  {
     path: "selectMappedAssociation" , 
     component: SelectAssociationComponent , 
     data:{title:"Select Association",  breadcrumb: 'Select Association' }
  },

  
];
