import {Component, Output, Inject} from '@angular/core';
import {Knart} from '../models/knart';
import {ArtifactType} from '../models/artifact_type';
import {Format} from '../models/format';
import {Status} from '../models/status';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {window} from '@angular/browser';

import {XmlLoaderService} from '../services/xml_loader.service';
import {XmlExporterService} from '../services/xml_exporter.service';

import {Http} from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: '/home.html'
})
export class HomeComponent {

    editor_tab: 'metadata' | 'contributions' | 'related_resources' | 'model_references' | 'supporting_evidence';
    runtime_tab: 'conditions' | 'expressions' | 'external_data' | 'coverages';
    viewer_tab: 'action_group' | "preview" | 'original' | 'export';

    knart: Knart;
    documentFormat: Format = Format.HL7CDSKnowledgeArtifact13; // Just a default.

    remoteUrl: string = null;
    originalContentString: string;
    originalFileName: string;

    constructor( @Inject('Window') private window: Window, public toasterService: ToasterService, private xmlLoader: XmlLoaderService, private xmlExporter: XmlExporterService) {
        console.log("HomeComponent has been initialized.");
        this.reset();

        // To always start with a new document.
        // this.createFromTemplate();

        // Or to always start with a remote document. (Useful for debugging.)
        this.loadRemoteFile('https://raw.githubusercontent.com/cqframework/knartwork/master/examples/hl7-cds-ka-r1.3/FLACC_DocTemplate.xml');
        // this.loadRemoteFile('https://raw.githubusercontent.com/cqframework/knartwork/master/examples/hl7-cds-ka-r1.3/UTI_DocTemplate.xml');

    }

    loadRemoteUrl() {
        if (!!this.remoteUrl) {
            this.loadRemoteFile(this.remoteUrl);
        } else {
            this.toasterService.pop('warning', "Need URL", "Please provide a URL to load.");
        }
    }

    loadRemoteFile(url: string) {
        this.xmlLoader.loadXMLFromURL(url).subscribe(data => {
            let raw: string = data.text();
            console.log('Loaded raw remote file from: ' + url);
            this.loadFromContentString(raw);
        });
    }

    documentFormats(): Array<Format> {
        return Format.All;
    }

    reset() {
        this.knart = null;
        this.editor_tab = 'metadata';
        // this.editor_tab = 'supporting_evidence';
        this.runtime_tab = 'conditions';
        // this.runtime_tab = 'coverages';
        // this.viewer_tab = 'preview';
        this.viewer_tab = 'export';
        this.remoteUrl = null;
        this.originalContentString = null;
        this.originalFileName = null;
    }

    download() {
        this.toasterService.pop('warning', "Not Fully Implemented", "Some data will be missing from the export!");
        let doc = this.xmlExporter.createXMLDocumentFrom(this.knart);
        let serializer: XMLSerializer = new XMLSerializer();
        let str = serializer.serializeToString(doc);

        console.log(doc);
        window.open("data:text/json;charset=utf-8," + str);

        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
        pom.setAttribute('download', this.originalFileName ? this.originalFileName : 'knart.xml');
        pom.click();
    }

    revert(): void {
        if (this.canRevert()) {
            this.loadFromContentString(this.originalContentString);
        } else {
            this.toasterService.pop('warning', "Not Possible", "The original content isn't available, sorry!");
        }
    }


    canRevert(): boolean {
        return !!this.originalContentString
    }

    createFromTemplate() {
        let k = new Knart();
        k.title = null;
        k.description = null;
        k.schemaIdentifier = Knart.KNART_NAMESPACE;
        // k.artifactType = ArtifactType.OrderSet.value;
        this.knart = k;
    }

    loadFromContentString(content: string) {
        let knart = new Knart();
        var parser = new DOMParser();
        var doc: Document = parser.parseFromString(content, "application/xml");
        // try {
        this.knart = this.xmlLoader.loadFromXMLDocument(doc);
        this.originalContentString = content;
        this.toasterService.pop('success', "Loaded!", "Go do your thing.");
        // } catch (e) {
        //     console.log(e);
        //     this.toasterService.pop('error', 'Well blarg.', "Your file couldn't read or parsed. Is it valid and well-formed?");
        //     this.reset();
        // }
    }

    openFile(event) {
        console.log("Reading...");
        let input = event.target;
        if (input.files.length > 0) {
            let reader = new FileReader();
            reader.onload = () => {
                // this text is the content of the file
                this.loadFromContentString(reader.result);
            }
            reader.readAsText(input.files[0]);
        } else {
            this.reset();
        }
    }

}
