import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

import { Manifest } from '../models/browser/manifest';

@Injectable()
export class BrowserService {

    public MANIFEST_FILE_NAME: string = "manifest.json";

    constructor(private http: HttpClient) {
    }

    getManifest(repository: string): Observable<Manifest> {
        return this.http.get<Manifest>(repository + '/' + this.MANIFEST_FILE_NAME);
    }
}
