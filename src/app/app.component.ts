import { Component, OnInit, HostListener } from '@angular/core';
import { CESService, ActionEvent, eventFilter } from "context-event-client";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/filter';

export function debounce(delay: number = 300): MethodDecorator {
  return function(target: any, propertyKey: string, descriptor: 
    PropertyDescriptor) {
      let timeout = null;

      const original = descriptor.value;

      descriptor.value = function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => original.apply(this,args), delay);
      };

      return descriptor;
    };
}

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
  @HostListener('document:selectionchange', ['$event'])
    @debounce()
    onSelectionChange(ev:MouseEvent) {
      const sel = document.getSelection()
      const selectedText = sel.rangeCount ? sel.getRangeAt(0).toString() : null
      
      if(selectedText) {
        console.log("selectedText:", selectedText);
        // TODO: 
        // this.ces.send()
        // http://www.ke.tu-darmstadt.de/ontologies/ui_detail_level.owl#select-value
        // { selectedText: selectedText }
      }
    }

  ngOnInit(){
    this.ces.initialize(['artaka://ticks/second']);
    this.ces.getEventStream()
      // Here we can use any RxJs operators!
      .filter((event) => {
        return eventFilter(['artaka://*'], event);
      })
      .subscribe((event)=>{
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
