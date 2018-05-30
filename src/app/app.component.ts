import { Component, OnInit } from '@angular/core';
import { ContextEventService, CES, ActionEvent, JWTResponse } from 'context-event-client';
@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'app';
  CES: CES = new CES();
  constructor() {
    console.log("AppComponent has been initialized to establish router element.");
  }
  ngOnInit(){
    let event = new ActionEvent(
      "http://www.ke.tu-darmstadt.de/ontologies/ui_detail_level.owl#load",
      "knartwork://controllers/app",
      "file://filename.xml/knowledgeDocument",
      {"app" : "Knartwork"}
    );
    this.CES.send(event).then((response) => {
      console.info(response);
    });
  }
}
