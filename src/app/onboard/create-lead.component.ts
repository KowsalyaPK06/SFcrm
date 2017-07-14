import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Lead } from './lead';
import { BackendService } from './../../shared/services/backend.service';


@Component({
    templateUrl: './create-lead.component.html'
})

export class CreateLeadComponent implements OnInit {
    lead = new Lead();
    salutations: string[] = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

    constructor(
        private router: Router,
        private backendService: BackendService,
    ) { }

    ngOnInit(): void {
    }

    add(): void {
        let body = this.lead;
        this.backendService.createLead(body).subscribe(data => {
            this.router.navigate(['/onboard']);
        });
    }

}