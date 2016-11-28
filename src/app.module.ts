import {ModuleWithProviders, enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app/app.component';
import {HomeComponent} from './app/components/home.component';
import {MetadataComponent} from './app/components/metadata.component';
import {ApiComponent} from './app/components/api.component';
import {ContributionComponent} from './app/components/contribution.component';
import {ContributionsComponent} from './app/components/contributions.component';

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
        HttpModule
    ],       // module dependencies
    declarations: [
		AppComponent,
        ApiComponent,
        HomeComponent,
		MetadataComponent,
		ContributionsComponent,
		ContributionComponent
    ],   // components and directives
    providers: [
        appRoutingProviders,
        KnartworkService,
    ],                    // services
    bootstrap: [AppComponent]     // root component
})
export class AppModule {
}
