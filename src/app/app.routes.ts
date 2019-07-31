import { Routes } from '@angular/router';
import { PageTrackerComponent } from './page-tracker/page-tracker.component';
import { PageHistoryComponent } from './page-history/page-history.component';

export const routes: Routes = [
  { path: '', component: PageTrackerComponent },
  { path: 'history', component: PageHistoryComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // { path: '**', component: PageNotFoundComponent }
];
