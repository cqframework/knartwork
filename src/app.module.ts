import {ModuleWithProviders, enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
// import {DragulaModule} from 'ng2-dragula/ng2-dragula';

import {AppComponent} from './app/app.component';
import {HomeComponent} from './app/components/home.component';
import {MetadataComponent} from './app/components/metadata.component';
import {ActionsComponent} from './app/components/actions.component';
import {PreviewComponent} from './app/components/preview.component';
import {ApiComponent} from './app/components/api.component';
import {ContributionComponent} from './app/components/contribution.component';
import {ContributionsComponent} from './app/components/contributions.component';
import {RelatedResourcesComponent} from './app/components/related_resources.component';
import {ModelReferencesComponent} from './app/components/model_references.component';

import {KnartworkService} from './app/services/knartwork.service';


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
        // DragulaModule
    ],       // module dependencies
    declarations: [
        AppComponent,
        ApiComponent,
        HomeComponent,
        MetadataComponent,
        ActionsComponent,
        ContributionsComponent,
        ContributionComponent,
        RelatedResourcesComponent,
		ModelReferencesComponent,
        PreviewComponent
    ],   // components and directives
    providers: [
        appRoutingProviders,
        ToasterService,
        KnartworkService,
    ],                    // services
    bootstrap: [AppComponent]     // root component
})
export class AppModule {
}
