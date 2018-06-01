import { Component, OnInit } from '@angular/core';
import { CESService, ActionEvent } from "context-event-client";
@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private ces: CESService) {
    console.log("AppComponent has been initialized to establish router element.");
  }
  ngOnInit(){
    this.ces.send(new ActionEvent(
      "load",
      "knartwork://controllers/app",
      "file://knowledgeartifact.xml/knowledgeDocument",
      {"app" : "Knartwork"}
    ));
  }
}
