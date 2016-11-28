import {Component, Output} from '@angular/core';
import {Knart} from '../models/knart';
import {ArtifactType} from '../models/artifact_type';

@Component({
    selector: 'home',
    templateUrl: '/home.html'
})
export class HomeComponent {

    editor_tab: 'metadata' | 'contributions' | 'actions';
    viewer_tab: "preview" | 'xml';
    knart: Knart;

    originalXMLString: string;

    constructor() {
        console.log("HomeComponent has been initialized.");
        this.reset();
		this.createFromTemplate();
    }

    reset() {
        this.knart = null;
        this.editor_tab = 'metadata';
        this.originalXMLString = null;
    }

    createFromTemplate() {
        let k = new Knart();
        k.title = "My New Knart";
        k.description = 'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';
        k.schemaIdentifier = Knart.DEFAULT_SCHEMA_IDENTIFIER;
        k.artifactType = ArtifactType.DocumentationTemplate.value;
        // k.artifactType = ArtifactType.OrderSet.value;
        this.knart = k;
    }

    openFile(event) {
        console.log("Reading...");
        let input = event.target;
        if (input.files.length > 0) {
            let reader = new FileReader();
            reader.onload = () => {
                // this text is the content of the file
                this.originalXMLString = reader.result;
                let knart = new Knart();
                var parser = new DOMParser();
                var doc: Document = parser.parseFromString(this.originalXMLString, "application/xml");
                knart.loadFromXMLDocument(doc);
                this.knart = knart;
            }
            reader.readAsText(input.files[0]);
        } else {
            this.reset();
        }
    }

}
