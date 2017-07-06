import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './web-to-lead.component.html'
})

export class WebToLeadComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }
}