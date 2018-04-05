import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { BrowserService } from '../services/browser.service';
import { Manifest } from '../models/browser/manifest';
import { ManifestItem } from '../models/browser/manifest_item';

@Component({
    selector: 'browser',
    templateUrl: '../views/browser.pug',
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class BrowserComponent implements OnInit {

    manifest: Manifest;

    constructor(private route: ActivatedRoute, public toasterService: ToasterService, public browserService: BrowserService) {

    }

    ngOnInit() {
        let url = this.route.snapshot.queryParams["manifest"];
        this.browserService.getManifest(url).subscribe(data => {
            this.toasterService.pop("success", "Loaded!", "Content manifest has been loaded from: " + url);
            this.manifest = data;
        }, error => {
            this.toasterService.pop("error", "Uh oh", "The manifest file couldn't be loaded. Are you sure it's accessible from your browser environment? Check your browser console, and make sure the host has CORS enabled! URL: " + url);
            this.manifest = null;
        });
    }

    stringify(obj: any): string {
        return JSON.stringify(obj, null, "\t").trim();
    }

}
