import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

import { Manifest } from '../models/browser/manifest';

@Injectable()
export class BrowserService {

    constructor(private http: HttpClient) {
    }

    getManifest(url: string): Observable<Manifest> {
        return this.http.get<Manifest>(url);

    }
}
