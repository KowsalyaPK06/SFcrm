import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { appRouting } from './app.routing';

import { AppComponent } from './app.component';
import { NoComponentFound } from './not-found.component';
import { BackendService } from './../shared/services/backend.service';
import { StatusService } from './../shared/services/status.service';


@NgModule({
  imports: [
    appRouting,
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    NoComponentFound
  ],
  providers: [
    BackendService,
    StatusService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
