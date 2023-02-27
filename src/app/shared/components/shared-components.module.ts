import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { SearchModule } from '../search/search.module';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderComponent } from '../../layouts/components/header/header.component';
import { SidebarComponent } from '../../layouts/components/sidebar/sidebar.component';


// ONLY FOR DEMO
import { CustomizerComponent } from './customizer/customizer.component';

// ALWAYS REQUIRED 
import { SoraxAdminLayoutComponent } from '../../layouts/components/sorax-admin-layout/sorax-admin-layout.component';
import { SoraxAuthLayoutComponent } from '../../layouts/components/sorax-auth-layout/sorax-auth-layout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SidenavComponent } from '../../layouts/components/sidenav/sidenav.component';
import { FooterComponent } from '../../layouts/components/footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { ButtonLoadingComponent } from './button-loading/button-loading.component';
import { EgretSidebarComponent, EgretSidebarTogglerDirective } from './egret-sidebar/egret-sidebar.component';
import { BottomSheetShareComponent } from './bottom-sheet-share/bottom-sheet-share.component';
import { EgretExampleViewerComponent } from './example-viewer/example-viewer.component';
import { EgretExampleViewerTemplateComponent } from './example-viewer-template/example-viewer-template.component';
import { EgretNotifications2Component } from './egret-notifications2/egret-notifications2.component';
import { AppLoaderComponent } from 'app/common/components/app-loader/app-loader.component';


const components = [
  SidenavComponent,
  NotificationsComponent,
  SidebarComponent,
  HeaderComponent,
  SoraxAuthLayoutComponent,
  SoraxAdminLayoutComponent,
  BreadcrumbComponent,
  AppComfirmComponent,
  AppLoaderComponent,
  EgretNotifications2Component,
  CustomizerComponent,
  ButtonLoadingComponent,
  EgretSidebarComponent,
  FooterComponent,
  EgretSidebarTogglerDirective,
  BottomSheetShareComponent,
  EgretExampleViewerComponent,
  EgretExampleViewerTemplateComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    SearchModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedMaterialModule
  ],
  declarations: components,
  // entryComponents: [AppComfirmComponent, AppLoaderComponent, BottomSheetShareComponent],
  exports: components
})
export class SharedComponentsModule { }