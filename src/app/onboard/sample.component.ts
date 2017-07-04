import { Component, OnInit } from '@angular/core';

import { Lead } from './lead';
import { BackendService } from './../../shared/services/backend.service';


@Component({
  templateUrl: './sample.component.html'
})

export class SampleComponent implements OnInit {

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.backendService.getSFVersions().subscribe(res => {
      console.log(res);
    });
  }

  title: string = "Get Versions"; 
}