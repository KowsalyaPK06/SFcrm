import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Lead } from './lead';
import { BackendService } from './../../shared/services/backend.service';


@Component({
  templateUrl: './create-lead.component.html'
})

export class CreateLeadComponent implements OnInit {

  leads: Lead[];

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    // Retrieve posts from the API
    // this.backendService.getLeads().subscribe(leads => {
    //   this.leads = leads;
    // });
  }

  // salutations = [{
  //   "value": "Mr.",
  //   "display": "Mr."
  // }, {
  //   "value": "Mrs.",
  //   "display": "Mrs."
  // }, {
  //   "value": "Ms.",
  //   "display": "Ms."
  // }, {
  //   "value": "Dr.",
  //   "display": "Dr."
  // }, {
  //   "value": "Prof.",
  //   "display": "Prof."
  // }];
  salutations = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

  lead = new Lead();
  add(): void {
    console.log(this.lead);
    let body: object = {
      records: [this.lead]
    };
    this.backendService.createLead(body).subscribe(data => {
      console.log(data);
    });
  }

  public uploader: FileUploader = new FileUploader({ url: '/api/upload' });
  // public uploader: FileUploader = new FileUploader({ url: '/api/upload', disableMultipart: true });

  uploadFile(): void {
    // var formData = {
    //   "authtoken": authToken,
    //   "scope": "crmapi",
    //   "id": lead_id,
    //   "content": streamifier.createReadStream(fileItem.buffer),
    // };
  }

}