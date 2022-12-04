import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeIntervalsGridComponent } from './time-intervals-grid/time-intervals-grid.component';
import { DateTimeComponent } from './date-time/date-time.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeIntervalsGridComponent,
    DateTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
