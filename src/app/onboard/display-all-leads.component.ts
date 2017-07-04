import { Component, OnInit } from '@angular/core';

import { Lead } from './lead';
import { BackendService } from './../../shared/services/backend.service';


@Component({
  templateUrl: './display-all-leads.component.html'
})

export class DisplayAllLeadsComponent implements OnInit {

  leads: Lead[];

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.backendService.getLeads().subscribe(leads => {
      this.leads = leads;
    });
  }
}