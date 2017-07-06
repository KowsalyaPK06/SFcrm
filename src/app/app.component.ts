import { Component, OnInit } from '@angular/core';
import { BackendService } from './../shared/services/backend.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private backendService: BackendService,
  ) { }

  login(): void {
    this.backendService.login().subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.login();
  }
}