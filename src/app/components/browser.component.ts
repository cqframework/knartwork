import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { BrowserService } from '../services/browser.service';
import { Manifest } from '../models/browser/manifest';
import { ManifestItem } from '../models/browser/manifest_item';

@Component({
    selector: 'browser',
    templateUrl: '../views/browser.pug'
})
export class BrowserComponent implements OnInit {

    repository: string;
    manifest: Manifest;

    constructor(private route: ActivatedRoute, public toasterService: ToasterService, public browserService: BrowserService) {

    }

    ngOnInit() {
        let url = this.route.snapshot.queryParams["manifest"];
        this.repository = this.route.snapshot.queryParams["repository"];
        if (this.repository) {
            this.browserService.getManifest(this.repository).subscribe(data => {
                this.toasterService.pop("success", "Loaded!", "Content manifest has been loaded from: " + this.repository);
                this.manifest = data;
            }, error => {
                this.failureToLoad();
            });
        } else {
            this.failureToLoad();
        }
    }
    failureToLoad() {
        this.toasterService.pop("error", "Uh oh", "The manifest file couldn't be loaded. Are you sure it's accessible from your browser environment? Check your browser console, and make sure the host has CORS enabled! URL: " + this.repository);
        this.manifest = null;
    }
    stringify(obj: any): string {
        return JSON.stringify(obj, null, "\t").trim();
    }

}
