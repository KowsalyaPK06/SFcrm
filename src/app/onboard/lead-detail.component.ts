import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


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
            if (lead.verification_status__c === "Verified") {
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

  goBack(): void {
    this.location.back();
  }

  onChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append("id", this.lead.id);
      this.backendService.uploadFile(formData)
        .subscribe(data => console.log(data))
    }
  }

}
