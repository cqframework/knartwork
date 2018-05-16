// Core
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

// Environment build settings.
import { environment } from '../../environments/environment';

// RxsJS imports
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

// Models
import { AuthEvent, AuthEventType } from "../models/auth_event";
import { Observable } from "rxjs/Observable";
import { ToasterService } from "angular2-toaster";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";

interface Tokens {
  token: string;
  refreshToken: string;
}

@Injectable()
export class AuthenticationService {
  // A special observable called a Subject that allows
  // us to broadcast events to many subscribers.
  // See more here: http://reactivex.io/rxjs/manual/overview.html#subject
  // We will use this single stream for all types of auth events.
  authEvents$ = new Subject();
  // Hold the client id we get from the environment config
  CLIENT_ID = environment.KNARTWORK_OAUTH_CLIENT_ID;
  constructor(protected http: HttpClient,
              private toasterService: ToasterService) {
    this.authEvents$.subscribe({
      next: (v) => console.log('Auth event: ' + JSON.stringify(v))
    });
  }

  getConformanceURL(conformanceURI): Observable<any>{
    // let headers = new HttpHeaders({ 'Accept': 'application/json' })
    //   .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // let params = new HttpParams();
    return this.http.get(conformanceURI);
  }

  requestToken (type) : Observable<Tokens> {
    // Get our code and state from local storage
    let code: string = localStorage["code"];
    let stateId: string = localStorage["stateId"];
    let state: string = localStorage[stateId];
    // Load our OAuth parameters stored in the session.
    let tmp = JSON.parse(state);
    let tokenUri = tmp.tokenUri;
    let clientId = tmp.clientId;
    let secret = tmp.secret;
    let redirectUri = tmp.redirectUri;
    // Prep the token exchange call parameters
    let body =
      "grant_type=" + type +
      "&code=" +
      code +
      "&redirect_uri=" +
      encodeURI(redirectUri) +
      "&client_id=" +
      clientId;
    body = body.concat(type === 'refresh_token' ? "&refresh_token="
      + localStorage.getItem('refresh_token') : '');
    let opts = {
      headers: new HttpHeaders().append(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    };
    return this.http
      .post(tokenUri, body, opts)
      .map(resp => {
        return({token: resp["access_token"], refreshToken: resp["refresh_token"]});
      });
  }
  handleToken(): Observable<any> {
    // Get our code and state from local storage
    let code: string = localStorage["code"];
    let stateId: string = localStorage["stateId"];
    let state: string = localStorage[stateId];
    // Set our Service URL based on the state we get form storage.
    // If we do not have a valid state, redirect back to the launch component,
    // to re initiate the auth process.
    if(state){
      //JSON.parse(state).serviceUri
      // Let's find out if we still have a valid access token...
      let localStorageToken = this.checkForToken();
      if(!localStorageToken){
        this.requestToken('authorization_code').subscribe((tokens) => {
          this.setToken(tokens);
          return Observable.of(tokens.token);
        });
      } else {
        let eventData = { token: localStorageToken };
        this.emitAuthEvent(AuthEventType.TOKEN_ACQUIRED, eventData);
        return Observable.of(localStorageToken);
      }
    } else {
      this.toasterService.pop(
        'warning',
        'Authentication Error',
        'We could not authenticate this session. Please relaunch the app in SMART-on-FHIR mode.'
      );
      return Observable.of('We could not authenticate this session. Please relaunch the app in SMART-on-FHIR mode.');
    }
  }

  setToken(tokens: Tokens){
    localStorage.setItem(
      'token',
      tokens.token
    );
    localStorage.setItem(
      'refresh_token',
      tokens.refreshToken
    );
    let eventData = { token: tokens.token };
    this.emitAuthEvent(AuthEventType.TOKEN_ACQUIRED, eventData);
  }

  renewToken(): Observable<any> {
    return this.requestToken('refresh_token').map((tokens) => {
      this.setToken(tokens);
      return tokens.token;
    });
  }

  checkForToken() {
    return localStorage.getItem('token')
      ? localStorage.getItem('token')
      : false;
  }

  private logout(){
    localStorage.removeItem('token');
    this.emitAuthEvent(AuthEventType.LOGOUT,{});
  };

  private emitAuthEvent(type, data){
    this.authEvents$.next(new AuthEvent(type,data));
  }
}
