import { Routes } from '@angular/router';
import { PageTrackerComponent } from './page-tracker/page-tracker.component';
import { PageHistoryComponent } from './page-history/page-history.component';
import { PageChartComponent } from './page-chart/page-chart.component';

export const routes: Routes = [
  { path: 'chart', component: PageChartComponent },
  { path: 'tracker', component: PageTrackerComponent },
  { path: 'tracker/:date', component: PageTrackerComponent },
  { path: 'history', component: PageHistoryComponent },
  { path: '',   redirectTo: '/tracker', pathMatch: 'full' },
];
