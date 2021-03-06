import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Lead } from './lead';
import { BackendService } from './../../shared/services/backend.service';
import { StatusService } from './../../shared/services/status.service';


@Component({
	templateUrl: './display-all-leads.component.html'
})

export class DisplayAllLeadsComponent implements OnInit {
	leads: Lead[] = [];

	constructor(
		private router: Router,
		private backendService: BackendService,
		private statusService: StatusService
	) { }

	getLeads(): void {
		this.statusService.getLoginStatus().subscribe(loginStatus => {
			if (loginStatus) {
				this.backendService.getLeads().subscribe(leads => {
					this.leads = leads;
					return;
				});
			}
		});
	}

	ngOnInit(): void {
		this.getLeads();
	}

	gotoDetail(lead: Lead): void {
		const selectedLead: any = lead;
		const url: string = selectedLead.attributes.url;
		const urlArray: string[] = url.split('/');
		const id = urlArray[urlArray.length - 1];
		this.router.navigate(['/onboard/detail', id]);
	}
}
