// Author: Preston Lee

// Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { Routes, RouterModule } from '@angular/router';

// Third Party
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SnomedctModule } from './modules/snomedct/snomedct.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { MetadataComponent } from './components/metadata.component';
import { ActionGroupComponent } from './components/action_group.component';
import { PreviewComponent } from './components/preview.component';
import { ApiComponent } from './components/api.component';
import { BrowserComponent } from './components/browser.component';
import { ContributionsComponent } from './components/contributions.component';
import { RelatedResourcesComponent } from './components/related_resources.component';
import { ModelReferencesComponent } from './components/model_references.component';
import { ConditionsComponent } from './components/conditions.component';
import { ExpressionsComponent } from './components/expressions.component';
import { CoveragesComponent } from './components/coverages.component';
import { ExternalDataComponent } from './components/external_data.component';
import { LiteratureReferenceComponent } from './components/literature_reference.component'
import { SupportingEvidenceComponent } from './components/supporting_evidence.component';
import { HistoryComponent } from './components/history.component';
import { PreviewActionGroupComponent } from './components/preview_action_group.component';
import { LaunchComponent } from "./components/launch.component";

// Services
import { KnartworkService } from './services/knartwork.service';
import { BrowserService } from './services/browser.service';
import { KnartImporterService } from './services/knart_importer.service';
import { KnartExporterService } from './services/knart_exporter.service';
import { AuthenticationService } from "./services/authentication.service";


import "reflect-metadata";
import { CommonModule } from '@angular/common';

const routing = RouterModule.forRoot(
  [
    { path: '', component: HomeComponent },
    { path: 'launch', component: LaunchComponent },
    { path: 'api', component: ApiComponent },
    { path: 'browser', component: BrowserComponent }
  ],
  { enableTracing: false } // <-- debugging purposes only
);

@NgModule({
  declarations: [
    AppComponent,
    LaunchComponent,
    ApiComponent,
    BrowserComponent,
    HomeComponent,
    MetadataComponent,
    ActionGroupComponent,
    ContributionsComponent,
    RelatedResourcesComponent,
    ModelReferencesComponent,
    PreviewComponent,
    ConditionsComponent,
    ExpressionsComponent,
    SupportingEvidenceComponent,
    CoveragesComponent,
    ExternalDataComponent,
    LiteratureReferenceComponent,
    PreviewActionGroupComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // For Toaster
    ToastrModule.forRoot(),
    SnomedctModule
  ],
  providers: [
    AuthenticationService,
    ToastrService,
    KnartworkService,
    BrowserService,
    KnartImporterService,
    KnartExporterService,
    { provide: 'Window', useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
