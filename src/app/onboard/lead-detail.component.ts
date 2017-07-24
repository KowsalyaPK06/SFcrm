import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { Lead } from './lead';
import { BackendService } from './../../shared/services/backend.service';
import { StatusService } from './../../shared/services/status.service';


@Component({
	templateUrl: './lead-detail.component.html'
})

export class LeadDetailComponent implements OnInit {
	lead: Lead = {};
	filesToUpload: Object = {};
	docFilesToUpload: Object = {};
	leadLoaded = false;
	noOfRequiredDocFiles = 2;
	isUploadDocs = false;
	noOfRequiredImgFiles = 2;
	isUploadImg = false;

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
						// console.log(lead);
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
		}

		const filesUploaded = Object.keys(this.filesToUpload).length;
		this.isUploadImg = false;
		if (filesUploaded === this.noOfRequiredImgFiles) {
			this.isUploadImg = true;
		}
	}

	uploadFile() {
		const formData: FormData = new FormData();
		formData.append('id', this.lead.id);
		formData.append('uploadImage', 'true');

		Object.keys(this.filesToUpload)
			.map(key => {
				const file: File = this.filesToUpload[key];
				formData.append('file', file, key);
			});

		this.backendService.uploadFile(formData)
			.subscribe(
			data => alert(data.msg),
			error => alert(error),
			() => console.log('on success finish, not on error')
			);
	}


	handleDocFileInput(event: any) {
		const fileList: FileList = event.target.files;
		const fileName: string = event.target.name;
		if (fileList.length > 0) {
			this.docFilesToUpload[fileName] = fileList[0];
		}

		const filesUploaded = Object.keys(this.docFilesToUpload).length;
		this.isUploadDocs = false;
		if (filesUploaded === this.noOfRequiredDocFiles) {
			this.isUploadDocs = true;
		}
	}

	uploadDocFile() {
		const files = Object.keys(this.docFilesToUpload);

		const callUploadFile = (key) => {
			const formData: FormData = new FormData();
			formData.append('id', this.lead.id);
			formData.append('uploadDocs', 'true');
			const file: File = this.docFilesToUpload[key];
			formData.append(key, file, file.name);
			return this.backendService.uploadFile(formData)
		};

		Observable.from(files)
			.flatMap(callUploadFile)
			.subscribe(
			data => alert(data.msg),
			error => alert(error),
			() => {
				alert('All the Files uploaded');
				// Can be used if we need to display the file uploaded
				// this.getLead();
			}
			);
	}


	goBack(): void {
		this.location.back();
	}
}
