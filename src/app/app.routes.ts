import { Routes } from '@angular/router';
import { PageTrackerComponent } from './page-tracker/page-tracker.component';

export const routes: Routes = [
  { path: '', component: PageTrackerComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // { path: '**', component: PageNotFoundComponent }
];
