import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


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
		const url = '/api/getLead';
		const queryParams = new URLSearchParams();
		queryParams.set('leadId', id);
		return this.http.get(url, { params: queryParams })
			.map(res => res.json());
	}

	uploadFile(formData: FormData) {
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		const options = new RequestOptions({ headers: headers });
		const url = '/api/upload';
		return this.http.post(url, formData, options)
			.map(res => res.json())
			.catch(this.handleError);
	}

	private handleError(error: any) {
		console.log(error);
		console.log(error.status);
		return Observable.throw('Error');
	}
}
