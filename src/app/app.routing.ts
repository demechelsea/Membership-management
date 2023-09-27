import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { UnderdevComponent } from './common/components/underdev/underdev.component';
import { SoraxAuthGuard } from './core/guards/sorax-auth-guard.service';
import { SoraxSemiAuthGuard } from './core/guards/sorax-semi-auth-guard.service';
import { SoraxAdminLayoutComponent } from './layouts/components/sorax-admin-layout/sorax-admin-layout.component';
import { SoraxAuthLayoutComponent } from './layouts/components/sorax-auth-layout/sorax-auth-layout.component';
import { SoraxSemiAuthLayoutComponent } from './layouts/components/sorax-semi-auth-layout/sorax-semi-auth-layout.component';
import { TermsAndConditionsComponent } from './common/components/terms-and-conditions/terms-and-conditions.component';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'auth',pathMatch: 'full'},
    {
    path: '',
    component: SoraxAuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('app/auth/auth.module').then(m => m.default),        
      }
    ]
  },
  {
    path: '',
    component: SoraxAdminLayoutComponent,
    canActivate: [SoraxAuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    
    ]
  },
  {
    path: '',
    canActivate: [SoraxSemiAuthGuard],
    component: SoraxSemiAuthLayoutComponent,
    children: [
      {
        path: 'manageAssociations',
        loadChildren: () => import('app/manage-association/manage.association.module').then(m => m.ManageAssociationModule),
      },
    ]
  },
  {
    path: '',
    component: SoraxAdminLayoutComponent,
    canActivate: [SoraxAuthGuard],
    children: [
      {
        path: 'associationSettings',
        loadChildren: () => import('app/association-settings/association.settings.module').then(m => m.AssociationSettingsModule),
      },
    
    ]
  },
  {
    path: '',
    component: SoraxAdminLayoutComponent,
    canActivate: [SoraxAuthGuard],
    children: [
      {
        path: 'builder',
        loadChildren: () => import('app/website-builder/website.builder.module').then(m => m.WebsiteBuilderModule),
      },
    
    ]
  },
  {
    path: '',
    component: SoraxAdminLayoutComponent,
    canActivate: [SoraxAuthGuard],
    children: [
      {
        path: 'event-management',
        loadChildren: () => import('app/event-management/event.management.module').then(m => m.EventManagementModule),
      },
    ]
  },
  {
    path:'profile',
    component: SoraxAdminLayoutComponent,
    canActivate:[SoraxAuthGuard],
    children:[{
      path: 'profile',
      loadChildren:() => import('app/views/profile/profile.module').then(m => m.ProfileModule)
    }]
  },
  {
    path: '',
    component: SoraxAdminLayoutComponent,
    canActivate: [SoraxAuthGuard],
    children: [
      {
        path: 'membershipManagement',
        loadChildren: () => import('app/membership-management/membership.management.module').then(m => m.MembershipManagementModule),
      },
    
    ]
  },
  {
    path: 'underdev',
    component: SoraxAdminLayoutComponent,
    canActivate: [SoraxAuthGuard],
    children: [
      {
        path: '',component: UnderdevComponent,
      }
    ]
  },
  { path: 'termsAndCondtions', component: TermsAndConditionsComponent },
  { path: '**', component: PageNotFoundComponent }
  
];
//{ useHash: true, enableTracing: true, preloadingStrategy: PreloadAllModules }
// RouterModule.forRoot(rootRouterConfig, { useHash: false, relativeLinkResolution: 'legacy' })
@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


