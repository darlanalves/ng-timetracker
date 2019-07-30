import { Component } from '@angular/core';
import { TrackCategoryService } from '../time-track/track-category.service';

@Component({
  selector: 'time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent {
  categories$ = trackCategoryService.list();
  constructor(private trackCategoryService: TrackCategoryService) {}
}