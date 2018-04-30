// Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Routing
import { Routes, RouterModule } from '@angular/router';

// Third Party
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
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
import { SupportingEvidenceComponent } from './components/supporting_evidence.component';
import { HistoryComponent } from './components/history.component';
import { PreviewActionGroupComponent } from './components/preview_action_group.component';

// Services
import { KnartworkService } from './services/knartwork.service';
import { BrowserService } from './services/browser.service';
import { XmlLoaderService } from './services/xml_loader.service';
import { XmlExporterService } from './services/xml_exporter.service';

import "reflect-metadata";

const routing = RouterModule.forRoot(
  [
    { path: '', component: HomeComponent },
    { path: 'api', component: ApiComponent },
    { path: 'browser', component: BrowserComponent }
  ],
  { enableTracing: true } // <-- debugging purposes only
);

@NgModule({
  declarations: [
    AppComponent,
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
    PreviewActionGroupComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule, // For Toaster
    ToasterModule,
    SnomedctModule
  ],
  providers: [
    ToasterService,
    KnartworkService,
    BrowserService,
    XmlLoaderService,
    XmlExporterService,
    { provide: 'Window', useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
