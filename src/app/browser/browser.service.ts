// Author: Preston Lee

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Manifest } from '../manifest/manifest';
import { ManifestItem } from "../manifest/manifest_item";

@Injectable()
export class BrowserService {

    public MANIFEST_FILE_NAME: string = "manifest.json";

    constructor(private http: HttpClient) {
    }

    getManifest(repository: string): Observable<Manifest> {
        return this.http.get<Manifest>(repository + '/' + this.MANIFEST_FILE_NAME);
    }

    audit(repository: string, manifest: Manifest) {
        manifest.groups.forEach(g => {
            g.items.forEach(i => {
                let url = i.url
                if(i.path) {
                    url = repository + '/' + i.path;
                }
                console.log(url);
                this.http.head(url).subscribe(response => {
                        console.log(response);
                        i.audit = ManifestItem.AUDIT_AVAILABLE
                    }, error => {
                        // if(error instanceof HttpErrorResponse) {
                        //     let e = error as HttpErrorResponse;
                            // console.log(e);
                            i.audit = ManifestItem.AUDIT_UNAVAILABLE
                        // }
                    }
                );
            });
        });
    }
}
