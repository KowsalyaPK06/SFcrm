import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BackendService {
  constructor(private http: Http) { }

  login() {
    return this.http.get('/api/login')
      .map(res => res.json());
  }

  getLeads() {
    return this.http.get('/api/getLeads')
      .map(res => res.json());
  }

  createLead(body: object) {
    return this.http.post('/api/createLead', body)
      .map(res => res.json());
  }

  getLead(id: string) {
    let url:string = "/api/getLead"
    let queryParams = new URLSearchParams();
    queryParams.set("leadId", id);
    return this.http.get(url, {params: queryParams})
      .map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}