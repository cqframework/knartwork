import { Component, OnInit } from '@angular/core';
import { CESService } from './services/ces.service';
@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(private ces: CESService) {
    console.log("AppComponent has been initialized to establish router element.");
  }
  ngOnInit(){
    this.ces.send({
      topic_uri: "load",
      controller_uri: "knartwork://controllers/app",
      model_uri: "file://filename.xml/knowledgeDocument",
      parameters: {"app" : "Knartwork"}
    });
  }
}
