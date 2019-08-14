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
import { PageComponent } from './page/page.component';
import { CardComponent } from './card/card.component';
import { PageHistoryComponent } from './page-history/page-history.component';
import { TimeChartComponent } from './time-chart/time-chart.component';
import { ChartistModule } from 'ng-chartist';
import { PageChartComponent } from './page-chart/page-chart.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    RouterModule,
    ChartistModule,
    RouterModule.forRoot(routes) ],

  declarations: [ 
    AppComponent,
    TimeTrackerComponent,
    TimeTableComponent,
    NotifyComponent,
    TimeFilter,
    ModalComponent,
    PageTrackerComponent,
    PageComponent,
    CardComponent,
    PageHistoryComponent,
    TimeChartComponent,
    PageChartComponent ],
  
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
