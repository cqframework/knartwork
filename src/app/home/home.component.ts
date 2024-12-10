// Author: Preston Lee

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Knart } from '../knart_model/knart';
import { Format } from '../knart_model/format';
import { ToastrService } from 'ngx-toastr';


import { KnartImporterService } from '../services/knart_importer.service';
import { KnartExporterService } from '../services/knart_exporter.service';

import { ActionGroupComponent } from '../components/action_group.component';
import { ConditionsComponent } from '../components/conditions.component';
import { ContributionsComponent } from '../components/contributions.component';
import { CoveragesComponent } from '../components/coverages.component';
import { ExpressionsComponent } from '../components/expressions.component';
import { ExternalDataComponent } from '../components/external_data.component';
import { HistoryComponent } from '../components/history.component';
import { ModelReferencesComponent } from '../components/model_references.component';
import { PreviewComponent } from '../components/preview.component';
import { RelatedResourcesComponent } from '../components/related_resources.component';
import { SupportingEvidenceComponent } from '../components/supporting_evidence.component';
import { MetadataComponent } from '../metadata/metadata.component';

// import { CESService, ActionEvent } from "context-event-client";

@Component({
    selector: 'home',
    templateUrl: 'home.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule,
        MetadataComponent,
        ContributionsComponent,
        ModelReferencesComponent,
        SupportingEvidenceComponent,
        RelatedResourcesComponent,
        ConditionsComponent,
        ExternalDataComponent,
        ExpressionsComponent,
        CoveragesComponent,
        HistoryComponent,
        ActionGroupComponent,
        PreviewComponent]
})
export class HomeComponent implements OnInit {

    editor_tab: 'metadata' | 'contributions' | 'related_resources' | 'model_references' | 'supporting_evidence' = 'metadata';
    runtime_tab: 'conditions' | 'expressions' | 'external_data' | 'coverages' | 'history' = 'conditions';
    viewer_tab: 'action_group' | "preview" | 'original' = 'action_group';// | 'export';

    knart: Knart | undefined;
    documentFormat: Format = Format.HL7CDSKnowledgeArtifact13; // Just a default.

    remoteUrl: string | undefined;
    originalContentString: string | undefined;
    originalFileName: string | undefined;

    constructor(@Inject('Window') private window: Window,
        private route: ActivatedRoute,
        public toasterService: ToastrService,
        private xmlImporter: KnartImporterService,
        private xmlExporter: KnartExporterService
        // private ces: CESService
    ) {
        // console.log("HomeComponent has been initialized.");
        this.reset();

        // To always start with a new document.
        // this.createFromTemplate();

        // Or to always start with a remote document. (Useful for debugging.)
        // this.loadRemoteFile('https://raw.githubusercontent.com/cqframework/knartwork/master/examples/hl7-cds-ka-r1.3/FLACC_DocTemplate.xml');
        // this.loadRemoteFile('https://raw.githubusercontent.com/cqframework/knartwork/master/examples/hl7-cds-ka-r1.3/UTI_DocTemplate.xml');

    }

    ngOnInit() {
        let url = this.route.snapshot.queryParams["url"];
        if (url) {
            this.remoteUrl = url;
            this.loadRemoteUrl();
        }
    }

    loadRemoteUrl() {
        if (!!this.remoteUrl) {
            this.loadRemoteFile(this.remoteUrl);
        } else {
            this.toasterService.warning('warning', "Need URL. Please provide a URL to load.");
        }
    }

    filenameFor(url: string): string {
        let path = url.substring(url.lastIndexOf("/") + 1);
        return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0]?.toString() || '';
    }

    loadRemoteFile(url: string) {
        const obs = this.xmlImporter.loadXMLFromURL(url);
        obs.subscribe((data) => {
            console.log(data);
            const raw = data;
            console.log('Downloaded raw remote file from: ' + url);
            this.loadFromContentString(data);
            this.originalFileName = this.filenameFor(url);
        });
    }

    documentFormats(): Array<Format> {
        return Format.All;
    }

    reset() {
        this.knart = undefined;
        this.editor_tab = 'metadata';
        this.runtime_tab = 'conditions';
        this.viewer_tab = 'action_group';
        this.remoteUrl = undefined;
        this.originalContentString = undefined;
        this.originalFileName = undefined;
    }

    download() {
        if (this.knart) {

            this.toasterService.warning('warning', "Not Fully Implemented. Some data will be missing from the export!");
            let doc = this.xmlExporter.createXMLDocumentFrom(this.knart);
            let serializer: XMLSerializer = new XMLSerializer();
            let str = serializer.serializeToString(doc);

            console.log(doc);

            // To open in a new tab. (Useful for debugging)
            // window.open("data:text/json;charset=utf-8," + str);

            // To download the file.
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
            pom.setAttribute('download', this.originalFileName ? this.originalFileName : 'knart.xml');
            pom.click();
        } else {
            this.toasterService.error("Not Fully Implemented. Some data will be missing from the export!", 'Error');
        }
    }

    revert(): void {
        if (this.canRevert() && this.originalContentString) {
            this.loadFromContentString(this.originalContentString);
        } else {
            this.toasterService.warning('warning', "Not Possible. The original content isn't available, sorry!");
        }
    }

    canRevert(): boolean {
        return !!this.originalContentString
    }

    createFromTemplate() {
        let k = new Knart();
        k.title = '';
        k.description = '';
        k.schemaIdentifier = Knart.KNART_NAMESPACE;
        // k.artifactType = ArtifactType.OrderSet.value;
        this.knart = k;
    }

    loadFromContentString(content: string) {
        var parser = new DOMParser();
        var doc: Document = parser.parseFromString(content, "application/xml");
        // try {
            // this.knart = this.xmlImporter.loadFromXMLDocument(doc);
            // this.originalContentString = content;
            // this.toasterService.success('It may take a few seconds for the UI to refresh.', "Loaded! Go do your thing.");
            // Possible workaround for of loading asynchronously to prevent UI blocking and Zone.js issues.
            this.xmlImporter.loadFromXMLDocument(doc).then((knart) => {
                this.knart = knart;
                this.originalContentString = content;
                this.toasterService.success('It may take a few seconds for the UI to refresh.', "Loaded! Go do your thing.");
            }).catch((e) => {   
                console.log(e);
                this.toasterService.error("Your file couldn't read or parsed. Is it valid and well-formed?", "Well blarg.");
                this.reset();
            });
        // } catch (e) {
        //     console.log(e);
        //     this.toasterService.error("Your file couldn't read or parsed. Is it valid and well-formed?", "Well blarg.");
        //     this.reset();
        // }
    }

    openFile(event: any) {
        console.log("Reading...");
        let input = event.target;
        if (input.files.length > 0) {
            let reader = new FileReader();
            reader.onload = () => {
                // this text is the content of the file
                this.loadFromContentString(reader.result!.toString());
            }
            let file: File = input.files[0];
            reader.readAsText(file);
            this.originalFileName = file.name;
            console.log("File name: " + this.originalFileName);

            // this.ces.send(new ActionEvent(
            //     "file-picker",
            //     "knartwork://controllers/home",
            //     "file://filename.xml/knowledgeDocument",
            //     { "filename": this.originalFileName }
            // ));

        } else {
            this.reset();
        }
    }

    tabClicked(tab: 'metadata' | 'contributions' | 'related_resources' | 'model_references' | 'supporting_evidence') {
        this.editor_tab = tab;
    }

}
