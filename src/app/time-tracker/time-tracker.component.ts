import { Component } from '@angular/core';
import { TrackCategoryService } from '../time-track/track-category.service';

@Component({
  selector: 'time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent {
  categories$ = this.trackCategoryService.list();
  constructor(private trackCategoryService: TrackCategoryService) {}

  removeCategory(category: Category) {
    this.trackCategoryService.remove(category.id);
  }

  addCategory() {
    const name = prompt('New category:', '').trim();
    
    if (!name) { return; }

    this.trackCategoryService.create(name);
  }
}