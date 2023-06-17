import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { GestureConfig } from '@angular/material/core';
import { 
  PerfectScrollbarModule, 
  PERFECT_SCROLLBAR_CONFIG, 
  PerfectScrollbarConfigInterface
} from './shared/components/perfect-scrollbar';


import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';

import { AppRoutingModule, rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { ToastrModule } from 'ngx-toastr';
import { SoraxCommonModule } from './common/sorax-common.module';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppErrorHandler } from './common/errors/app-error-handler';
import { SoraxHttpInterceptorService } from './core/guards/sorax-http-interceptor.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    HttpClientModule,
    DragDropModule,
    AppRoutingModule,
    SoraxCommonModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true}),
    ToastrModule.forRoot(),

    StoreModule.forRoot({router: routerReducer}),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),

  ],
  declarations: [AppComponent],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    {provide:HTTP_INTERCEPTORS, useClass:SoraxHttpInterceptorService, multi: true},
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }