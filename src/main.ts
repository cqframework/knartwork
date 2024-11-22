// Author: Preston Lee

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AuthenticationService } from './app/services/authentication.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { KnartworkService } from './app/services/knartwork.service';
import { BrowserService } from './app/services/browser.service';
import { KnartImporterService } from './app/services/knart_importer.service';
import { KnartExporterService } from './app/services/knart_exporter.service';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './app/components/home.component';
import { LaunchComponent } from './app/components/launch.component';
import { ApiComponent } from './app/components/api.component';
import { BrowserComponent } from './app/components/browser.component';
import { FormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

const routing = RouterModule.forRoot(
  [
    { path: '', component: HomeComponent },
    { path: 'launch', component: LaunchComponent },
    { path: 'api', component: ApiComponent },
    { path: 'browser', component: BrowserComponent }
  ],
  { enableTracing: false } // <-- debugging purposes only
);




bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, routing, FormsModule, CommonModule, // For Toaster
        ToastrModule.forRoot()),
        AuthenticationService,
        ToastrService,
        KnartworkService,
        BrowserService,
        KnartImporterService,
        KnartExporterService,
        { provide: 'Window', useValue: window },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
