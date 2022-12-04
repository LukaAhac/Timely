import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeIntervalsGridComponent } from './time-intervals-grid/time-intervals-grid.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { NameFormComponent } from './name-form/name-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TimeIntervalsGridComponent,
    DateTimeComponent,
    NameFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
