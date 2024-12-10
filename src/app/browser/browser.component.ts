// Author: Preston Lee

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";

import { ToastrService } from "ngx-toastr";

import { BrowserService } from "./browser.service";
import { Manifest } from "../manifest/manifest";
import { ManifestItem } from "../manifest/manifest_item";


import { plainToClass } from "class-transformer";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "browser",
  templateUrl: "browser.html",
  imports: [CommonModule, FormsModule, RouterModule]
})
export class BrowserComponent implements OnInit {

  repository: string | undefined;
  manifest: Manifest | undefined;
  filter = "";

  public static MIME_TYPE_MAP: { [key: string]: string } = {
    "application/pdf": "PDF",
    "application/msword": "Word",
    "text/html": "HTML",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "Word",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "Excel",
    "application/hl7-cds-knowledge-artifact-1.3+xml": "HL7 KNART v1.3"
  };

  public static KNART_MIME_TYPES = [
    "application/hl7-cds-knowledge-artifact-1.3+xml"
  ];

  public static TAB_GROUP: string = 'group';
  public static TAB_TYPE: string = 'type';
  public static TAB_TAG: string = 'tag';
  public static TAB_AUDIT: string = 'audit';
  public activeTab: string = BrowserComponent.TAB_GROUP;

  constructor(
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private browserService: BrowserService
  ) {
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
          this.manifest = plainToClass(Manifest, data);
          // this.manifest = data;
          console.log(this.manifest.repackage());
        },
        error => {
          this.failureToLoad();
        }
      );
    } else {
      this.failureToLoad();
    }
  }
  mimeTypeToName(type: string): string {
    return BrowserComponent.MIME_TYPE_MAP[type] || type;
  }
  isKnartMimeType(type: string) {
    return BrowserComponent.KNART_MIME_TYPES.includes(type);
  }
  getMimeTypesFor(manifest: Manifest): Array<string> {
    return Array.from(manifest.mimeTypes.keys()).sort();
  }
  getTagsFor(manifest: Manifest): Array<string> {
    return Array.from(manifest.tags.keys()).sort();
  }

  failureToLoad() {
    // this.toasterService.pop("error", "Uh oh", "The manifest file couldn't be loaded. Are you sure it's accessible from your browser environment? Check your browser console, and make sure the host has CORS enabled! URL: " + this.repository);
    this.manifest = undefined;
  }

  audit() {
    this.toasterService.success("success", "Starting audit. The availability of each resource is being verified.");
    if (this.repository && this.manifest) {
      this.browserService.audit(this.repository, this.manifest);
    }
  }

  stringify(obj: any): string {
    return JSON.stringify(obj, null, "\t").trim();
  }

}
