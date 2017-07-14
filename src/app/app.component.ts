import { Component, OnInit } from '@angular/core';
import { BackendService } from './../shared/services/backend.service';
import { StatusService } from './../shared/services/status.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private backendService: BackendService,
    private statusService: StatusService,
  ) { }

  login(): void {
    this.backendService.login().subscribe(res => {
      console.log(res);
      this.statusService.setLoginStatus(true);
    });
  }

  ngOnInit(): void {
    this.login();
  }
}