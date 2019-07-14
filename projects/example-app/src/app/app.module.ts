import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AsyncComputeModule } from 'projects/ng-async-compute/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AsyncComputeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
