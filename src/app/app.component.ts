import { Component, OnInit } from '@angular/core';

import ces, { EventModel } from './services/ces';
@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor() {
    console.log("AppComponent has been initialized to establish router element.");
  }
  ngOnInit(){
    let event = {
      person_id:"test",
      topic_uri:"http://www.ke.tu-darmstadt.de/ontologies/ui_detail_level.owl#mouse-single-click",
      model_uri:"",
      agent_uri:"artaka://agents/knartwork",
      parameters: {anything : "some data"}
    };
    ces.send(event).then((response) => {
      console.info(response);
    });
  }
}
