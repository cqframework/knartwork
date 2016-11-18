import {ModuleWithProviders, enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app/app.component';
import {HomeComponent} from './app/components/home.component';
import {ApiComponent} from './app/components/api.component';

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
        HomeComponent
    ],   // components and directives
    providers: [
        appRoutingProviders,
        KnartworkService,
    ],                    // services
    bootstrap: [AppComponent]     // root component
})
export class AppModule {
}
