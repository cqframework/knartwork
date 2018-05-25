export abstract class EventModel {
  person_id: string;
  topic_uri: string;
  model_uri: string;
  agent_uri: string;
  parameters: any;
}
let url = 'http://context-event-service.prestonlee.com/events';
let ces = {
  url: url,
  send: (event: EventModel) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(event),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
};

export default ces;
