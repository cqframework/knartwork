import {Component, Output} from '@angular/core';
import {Knart} from '../models/knart';
import {ArtifactType} from '../models/artifact_type';
import {Format} from '../models/format';
import {Status} from '../models/status';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
    selector: 'home',
    templateUrl: '/home.html'
})
export class HomeComponent {

    editor_tab: 'metadata' | 'contributions' | 'actions' | 'related_resources' | 'model_references';
    viewer_tab: "preview" | 'original';
    knart: Knart;
    documentFormat: Format = Format.HL7CDSKnowledgeArtifact13; // Just a default.

    originalContentString: string;

    constructor(public toasterService: ToasterService) {
        console.log("HomeComponent has been initialized.");
        this.reset();
        this.createFromTemplate(); // To always start with a new document.
    }


    documentFormats(): Array<Format> {
        return Format.All;
    }

    reset() {
        this.knart = null;
        // this.editor_tab = 'metadata';
        this.editor_tab = 'contributions';
        this.viewer_tab = 'preview';
        this.originalContentString = null;
    }

    export() {
        this.toasterService.pop('warning', "Not Implemented", "File exports haven't been implemented yet, sorry!");
    }

    createFromTemplate() {
        let k = new Knart();
        // k.title = "My New Knart";
		k.title = null;
        // k.description = 'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';
		k.description = null;
        k.schemaIdentifier = Knart.DEFAULT_SCHEMA_IDENTIFIER;
        // k.artifactType = ArtifactType.OrderSet.value;
        this.knart = k;
    }

    createFromContentString() {
        let knart = new Knart();
        var parser = new DOMParser();
        var doc: Document = parser.parseFromString(this.originalContentString, "application/xml");
        try {
            knart.loadFromXMLDocument(doc);
            this.knart = knart;
            this.toasterService.pop('success', "Loaded!", "Go do your thing.");
        } catch (e) {
            this.toasterService.pop('error', 'Well blarg.', "Your file couldn't be parsed. Is it valid and well-formed?");
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
                this.originalContentString = reader.result;
                this.createFromContentString();
            }
            reader.readAsText(input.files[0]);
        } else {
            this.reset();
        }
    }

}
