import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import 'rxjs/Rx';


@Injectable()
export class BackendService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getLeads() {
    return this.http.get('/api/getLeads')
      .map(res => res.json());
  }

  createLead(body: object) {
    return this.http.post('/api/createLead', body)
      .map(res => res.json());
  }

  login() {
    return this.http.get('/auth/login')
      .map(res => res.json());

    // var headers = new Headers();
    // headers.append("Content-Type", "application/x-www-form-urlencoded");

    // var data = {
    //   "grant_type": "authorization_code",
    //   "client_id": "3MVG9d8..z.hDcPLJsDkfc.PmnZBpNM_3Dzm7tuxU0hnQ8g1vl0N7WZeRFT03wPONBqTOzzk8sJ6DF0t9TbB3",
    //   "client_secret": "6258344917667469925",
    //   "username": "kowsalya@samplecrm.com",
    //   "password": "salesforce@75MOuohAuXr2svXB6UH3BTc2c"
    // }

    // var body = JSON.stringify(data);

    // return this.http.post('https://login.salesforce.com/services/oauth2/token', body, { headers: headers })
    //   .map(res => {
    //     console.log(res)
    //     res.json()
    //   });
  }

  getSFVersions() {
    return this.http.get('https://sampledomaini-dev-ed.my.salesforce.com/services/data/')
      .map(res => res.json());
    // .subscribe(
    // (data) => { console.log(data); },
    // (err) => { console.log(err); }); // Reach here if fails
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}