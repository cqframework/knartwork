import {Component, Output, Inject, OnInit, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Knart} from '../models/knart';
import {ArtifactType} from '../models/artifact_type';
import {Format} from '../models/format';
import {Status} from '../models/status';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {window} from '@angular/browser';

import {KnartImporterService} from '../services/knart_importer.service';
import {KnartExporterService} from '../services/knart_exporter.service';

import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import { CESService, ActionEvent } from "context-event-client";

@Component({
    selector: 'home',
    templateUrl: '../views/home.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    editor_tab: 'metadata' | 'contributions' | 'related_resources' | 'model_references' | 'supporting_evidence';
    runtime_tab: 'conditions' | 'expressions' | 'external_data' | 'coverages' | 'history';
    viewer_tab: 'action_group' | "preview" | 'original';// | 'export';

    knart: Knart;
    documentFormat: Format = Format.HL7CDSKnowledgeArtifact13; // Just a default.

    remoteUrl: string = null;
    originalContentString: string;
    originalFileName: string;

    constructor( @Inject('Window') private window: Window,
                 private route: ActivatedRoute,
                 public toasterService: ToasterService,
                 private xmlImporter: KnartImporterService,
                 private xmlExporter: KnartExporterService,
                 private ces: CESService) {
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
            this.remoteUrl = url
            this.loadRemoteUrl();
        //     this.browserService.getManifest(this.repository).subscribe(data => {
		// 		// this.toasterService.pop("success", "Loaded!", "Content manifest has been loaded from: " + this.repository);
		// 		console.log(data);
        //         this.manifest = data;
        //     }, error => {
        //         this.failureToLoad();
        //     });
        // } else {
        //     this.failureToLoad();
        }
    }

    loadRemoteUrl() {
      if (!!this.remoteUrl) {
        this.ces.send(new ActionEvent(
          "load",
          "knartwork://controllers/home",
          "file://knowledgeartifact.xml/knowledgeDocument",
          {"url" : this.remoteUrl }
        ));
        this.loadRemoteFile(this.remoteUrl);
      } else {
          this.toasterService.pop('warning', "Need URL", "Please provide a URL to load.");
      }
    }

    filenameFor(url: string): string {
        let path = url.substring(url.lastIndexOf("/") + 1);
        return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0];
    }

    loadRemoteFile(url: string) {
        this.xmlImporter.loadXMLFromURL(url).subscribe(data => {
            let raw: string = data.text();
            console.log('Loaded raw remote file from: ' + url);
            this.loadFromContentString(raw);
            this.originalFileName = this.filenameFor(url);
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
        this.viewer_tab = 'action_group';
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

        // To open in a new tab. (Useful for debugging)
        // window.open("data:text/json;charset=utf-8," + str);

        // To download the file.
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

        this.ces.send(new ActionEvent(
          "create-information-object",
          "knartwork://controllers/home",
          "file://newknowledgeartifact.xml/knowledgeDocument",
          {"template" : "new"}
        ));
    }

    loadFromContentString(content: string) {
        let knart = new Knart();
        var parser = new DOMParser();
        var doc: Document = parser.parseFromString(content, "application/xml");
        try {
            this.knart = this.xmlImporter.loadFromXMLDocument(doc);
            this.originalContentString = content;
            this.toasterService.pop('success', "Loaded!", "Go do your thing.");
        } catch (e) {
            console.log(e);
            this.toasterService.pop('error', 'Well blarg.', "Your file couldn't read or parsed. Is it valid and well-formed?");
            this.reset();
        }
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
            let file: File = input.files[0];
            reader.readAsText(file);
            this.originalFileName = file.name;
            console.log("File name: " + this.originalFileName);

          this.ces.send(new ActionEvent(
            "file-picker",
            "knartwork://controllers/home",
            "file://filename.xml/knowledgeDocument",
            {"filename" : this.originalFileName}
          ));

        } else {
            this.reset();
        }
    }

    tabClicked(tab){
      this.editor_tab = tab;
      let event = new ActionEvent(
        "view",
        "knartwork://controllers/home",
        "",
        {view : tab }
      );
      switch(tab){
        case 'contributions':
          event.controller_uri += '/' + tab;
          event.model_uri = 'file://knowledgeartifact.xml/knowledgeDocument/metadata/contributions';
          event.parameters = {view : tab };
          break;
        case 'metadata':
          event.controller_uri += '/' + tab;
          event.model_uri = 'file://knowledgeartifact.xml/knowledgeDocument/metadata';
          event.parameters = {view : tab };
          break;
        case 'related_resources':
          event.controller_uri += '/' + 'relatedResources';
          event.model_uri = 'file://knowledgeartifact.xml/knowledgeDocument/metadata/relatedResources';
          event.parameters = {view : 'relatedResources' };
          break;
        case 'model_references':
          event.controller_uri += '/' + 'dataModels';
          event.model_uri = 'file://knowledgeartifact.xml/knowledgeDocument/metadata/dataModels';
          event.parameters = {view : 'dataModels' };
          break;
        case 'supporting_evidence':
          event.controller_uri += '/' + 'supportingEvidence';
          event.model_uri = 'file://knowledgeartifact.xml/knowledgeDocument/metadata/supportingEvidence';
          event.parameters = {view : 'supportingEvidence' };
          break;
      }
      this.ces.send(event);
    }

}
