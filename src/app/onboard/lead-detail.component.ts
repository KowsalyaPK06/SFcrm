import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Lead } from './lead';
import { BackendService } from './../../shared/services/backend.service';
import { StatusService } from './../../shared/services/status.service';


@Component({
	templateUrl: './lead-detail.component.html'
})

export class LeadDetailComponent implements OnInit {
	lead: Lead = {};
	filesToUpload: Object = {};
	leadLoaded = false;

	constructor(
		private backendService: BackendService,
		private statusService: StatusService,
		private route: ActivatedRoute,
		private location: Location
	) { }

	getImage(): void {
		const imageUrl: string = this.lead.sample_image__c;
		this.lead.sample_image__c = imageUrl.replace(/&amp;/g, '&');
		this.leadLoaded = true;
	}

	getLead(): void {
		this.statusService.getLoginStatus().subscribe(loginStatus => {
			if (loginStatus) {
				this.route.params
					.switchMap((params: Params) => this.backendService.getLead(params['id']))
					.subscribe(lead => {
						console.log(lead);
						this.lead = lead;
						if (lead.verification_status__c === 'Verified') {
							this.getImage();
						} else {
							this.leadLoaded = true;
						}
					});
			}
		});
	}

	ngOnInit(): void {
		this.getLead();
	}

	handleFileInput(event: any) {
		const fileList: FileList = event.target.files;
		const fileName: string = event.target.name;
		if (fileList.length > 0) {
			this.filesToUpload[fileName] = fileList[0];
			console.log(this.filesToUpload);
		}
	}

	uploadFile() {
		const formData: FormData = new FormData();
		formData.append('id', this.lead.id);

		Object.keys(this.filesToUpload)
			.map(key => {
				const file: File = this.filesToUpload[key];
				formData.append('file', file, key);
			});

		this.backendService.uploadFile(formData)
			.subscribe(
			data => console.log(data),
			error => alert(error),
			() => console.log('on success finish, not on error')
			);
	}

	goBack(): void {
		this.location.back();
	}
}
