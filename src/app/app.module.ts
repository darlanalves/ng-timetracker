import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { NotifyComponent } from './notify/notify.component';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, HttpClientModule ],
  declarations: [ AppComponent, TimeTrackerComponent, TimeTableComponent, NotifyComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
