import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { TimeFilter } from './time-table/time.filter';
import { NotifyComponent } from './notify/notify.component';
import { ModalComponent } from './modal/modal.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { PageTrackerComponent } from './page-tracker/page-tracker.component';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, HttpClientModule, RouterModule,
    RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, TimeTrackerComponent, TimeTableComponent, NotifyComponent, TimeFilter, ModalComponent,
    PageTrackerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
