import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ToasterService } from "angular2-toaster/angular2-toaster";

import { BrowserService } from "../services/browser.service";
import { Manifest } from "../models/browser/manifest";
import { ManifestItem } from "../models/browser/manifest_item";

@Component({
  selector: "browser",
  templateUrl: "../views/browser.pug"
})
export class BrowserComponent implements OnInit {
  repository: string;
  manifest: Manifest;
  filter = "";

  public static MIME_TYPE_MAP = {
    "application/pdf": "PDF",
    "application/msword": "Word",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "Word",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "Excel",
    "application/hl7-cds-knowledge-artifact-1.3+xml": "HL7 KNART v1.3"
  };

  public static KNART_MIME_TYPES = [
    "application/hl7-cds-knowledge-artifact-1.3+xml"
  ];

  constructor(
    private route: ActivatedRoute,
    private browserService: BrowserService
  ) {
    // private toasterService: ToasterService,
    console.log("Browser initializing.");
  }

  showItem(i: ManifestItem) {
    let show = false; // Prove we have to show the item.
    if (this.filter.length > 0) {
      let lower = this.filter.toLowerCase();
      if (i.name && i.name.toLowerCase().indexOf(lower) >= 0) {
        show = true;
    } else if (i.mimeType && i.mimeType.toLowerCase().indexOf(lower) >= 0) {
        show = true;
    } else if (i.path && i.path.toLowerCase().indexOf(lower) >= 0) {
        show = true;
      } else if (i.url && i.url.toLowerCase().indexOf(lower) >= 0) {
        show = true;
      }
    } else {
      // No filter. Show everything!
      show = true;
    }
    return show;
  }
  ngOnInit() {
    let url = this.route.snapshot.queryParams["manifest"];
    this.repository = this.route.snapshot.queryParams["repository"];
    if (this.repository) {
      this.browserService.getManifest(this.repository).subscribe(
        data => {
          // this.toasterService.pop("success", "Loaded!", "Content manifest has been loaded from: " + this.repository);
          console.log(data);
          this.manifest = data;
        },
        error => {
          this.failureToLoad();
        }
      );
    } else {
      this.failureToLoad();
    }
  }
  mimeTypeToName(type: string) {
    return BrowserComponent.MIME_TYPE_MAP[type] || "?";
  }
  isKnartMimeType(type: string) {
    return BrowserComponent.KNART_MIME_TYPES.includes(type);
  }
  failureToLoad() {
    // this.toasterService.pop("error", "Uh oh", "The manifest file couldn't be loaded. Are you sure it's accessible from your browser environment? Check your browser console, and make sure the host has CORS enabled! URL: " + this.repository);
    this.manifest = null;
  }
  stringify(obj: any): string {
    return JSON.stringify(obj, null, "\t").trim();
  }
}
