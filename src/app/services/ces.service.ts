import {Injectable} from "@angular/core";
import {ActionEvent, CES} from "context-event-client";
@Injectable()
export class CESService {
  CES: CES = new CES();
  send(event){
    this.CES.send(new ActionEvent(
      event.topic_uri,
      event.controller_uri,
      event.model_uri,
      event.parameters
    ));
  }
}
