import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Request, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class HttpClientService {
	constructor(private http: Http) { }

	// Set the headers and options for each request
	setOptions() {
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		const options = new RequestOptions({ headers: headers });
		return options;
	}

	get(url: string, params: any = null) {
		const options = new RequestOptions();
		if (params !== null || params !== undefined || params !== '') {
			options.params = params;
		}
		return this.http.get(url, options)
			.catch(this.handleError);
	}

	post(url: string, data: any) {
		return this.http.post(url, data, this.setOptions());
	}

	put(url: string, data: any) {
		return this.http.put(url, data, this.setOptions());
	}

	delete(url: string) {
		return this.http.delete(url, this.setOptions());
	}


	/*
		common method to handle response data
	*/
	// extractData(res: Response) {
	// 	let head: any = JSON.stringify(res.headers);
	// 	head = JSON.parse(head);
	// 	let body = res.json();
	// 	return body || {};
	// }


	// extractFileData(res: Response) {
	// 	return res;
	// }

	/*
		common method to handle error response
	*/

	handleError(error: Response | any) {
		console.log(error);
		let head: any = JSON.stringify(error.headers);
		head = JSON.parse(head);
		if (head['x-csrf-token']) {
			localStorage.setItem('csrftoken', head['x-csrf-token'][0]);
		}

		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	}

}
