import { Component, OnInit, HostListener } from '@angular/core';
import { CESService, ActionEvent, eventFilter } from "context-event-client";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/filter';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private ces: CESService,
              public toasterService: ToasterService,) {
    console.log("AppComponent has been initialized to establish router element.");
  }

  ngOnInit(){
    this.ces.initialize(['http://www.ke.tu-darmstadt.de/ontologies/ui_detail_level.owl#select-value', 'artaka://ticks/second']);
    this.ces.getEventStream()
      // Here we can use any RxJs operators!
      .filter((event) => {
        return eventFilter(['artaka*', 'select-value*'], event);
      })
      .subscribe((event)=>{
        this.toasterService.pop("success", "Context event Received", event.model_uri);
        console.info('Event received: ', event);
    });

    // setInterval(() => {
    //   this.ces.send(new ActionEvent(
    //     "load",
    //     "knartwork://controllers/app",
    //     "file://knowledgeartifact.xml/knowledgeDocument",
    //     {"app" : "Knartwork"}
    //   ));
    // }, 5000);
  }
}
