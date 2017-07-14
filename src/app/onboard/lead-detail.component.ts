import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';


import { Lead } from './lead';
import { BackendService } from './../../shared/services/backend.service';
import { StatusService } from './../../shared/services/status.service';


@Component({
  templateUrl: './lead-detail.component.html'
})

export class LeadDetailComponent implements OnInit {
  lead: Lead = {};
  leadLoaded: boolean = false;

  constructor(
    private backendService: BackendService,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getImage(): void {
    let imageUrl: string = this.lead.sample_image__c;
    this.lead.sample_image__c = imageUrl.replace(/&amp;/g, "&");
    this.leadLoaded = true;
  }

  getLead(): void {
    this.statusService.getLoginStatus().subscribe(loginStatus => {
      if (loginStatus) {
        this.route.params
          .switchMap((params: Params) => this.backendService.getLead(params['id']))
          .subscribe(lead => {
            this.lead = lead;
            this.leadLoaded = true;
            if (lead.verification_status__c === "Verified") {
              this.getImage();
            } else {
              
            }
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append("id", lead.id);
            };
          });
      }
    });
  }

  ngOnInit(): void {
    this.getLead();
  }

  public uploader = new FileUploader({ url: '/api/upload' });
  // public uploader: FileUploader = new FileUploader({ url: '/api/upload', disableMultipart: true });

  goBack(): void {
    this.location.back();
  }
}
