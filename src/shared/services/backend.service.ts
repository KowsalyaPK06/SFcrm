import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';


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

  getSFVersions() {
    return this.http.get('https://sampledomaini-dev-ed.my.salesforce.com/services/data/')
      .map(res => res.json());
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}