import {ModuleWithProviders, enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import {Http} from '@angular/http';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
// import {DragulaModule} from 'ng2-dragula/ng2-dragula';

import {AppComponent} from './app/app.component';
import {HomeComponent} from './app/components/home.component';
import {MetadataComponent} from './app/components/metadata.component';
import {ActionGroupComponent} from './app/components/action_group.component';
import {PreviewComponent} from './app/components/preview.component';
import {ApiComponent} from './app/components/api.component';
import {ContributionsComponent} from './app/components/contributions.component';
import {RelatedResourcesComponent} from './app/components/related_resources.component';
import {ModelReferencesComponent} from './app/components/model_references.component';
import {ConditionsComponent} from './app/components/conditions.component';
import {ExpressionsComponent} from './app/components/expressions.component';
import {CoveragesComponent} from './app/components/coverages.component';
import {ExternalDataComponent} from './app/components/external_data.component';
import {SupportingEvidenceComponent} from './app/components/supporting_evidence.component';

import {PreviewActionGroupComponent} from './app/components/preview_action_group.component';
// import {ExportComponent} from './app/components/export.component';

import {KnartworkService} from './app/services/knartwork.service';
import {XmlLoaderService} from './app/services/xml_loader.service';
import {XmlExporterService} from './app/services/xml_exporter.service';

// import {ExportModule} from './app/modules/export.module';

enableProdMode();


import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'api', component: ApiComponent }
]
const appRoutingProviders: any[] = [];
const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        ToasterModule
        // ExportModule // Our own custom voodoo.
    ],
    declarations: [
        AppComponent,
        ApiComponent,
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
        PreviewActionGroupComponent
        // ExportComponent
    ],   // components and directives
    providers: [
        appRoutingProviders,
        ToasterService,
        KnartworkService,
        XmlLoaderService,
        XmlExporterService,
		{ provide: 'Window',  useValue: window }
    ],                    // services
    bootstrap: [AppComponent]     // root component
})
export class AppModule {
}
