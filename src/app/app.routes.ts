import { Routes } from '@angular/router';
import { PageTrackerComponent } from './page-tracker/page-tracker.component';
import { PageHistoryComponent } from './page-history/page-history.component';

export const routes: Routes = [
  { path: 'tracker', component: PageTrackerComponent },
  { path: 'history', component: PageHistoryComponent },
  { path: '',   redirectTo: '/tracker', pathMatch: 'full' },
];
