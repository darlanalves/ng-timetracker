import { Component } from '@angular/core';
import { TrackCategoryService } from '../time-track/track-category.service';
import { TimeTrackService } from '../time-track/time-track.service';
import { NotifyService } from '../notify/notify.service';
import { Category } from '../time-track/category';
import { TimeTable } from '../time-track/time-table';
import { Observable } from 'rxjs';

@Component({
  selector: 'time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent {
  categories$ = this.trackCategoryService.list();
  timeTable$: Observable<TimeTable>;

  newCategory: string = '';
  
  constructor(
    private trackCategoryService: TrackCategoryService,
    private timeTrackService: TimeTrackService,
    private notifyService: NotifyService,
  ) {
    this.updateTimeTable();
  }

  private updateTimeTable() {
    this.timeTable$ = this.timeTrackService.getTable(this.timeTrackService.today);
  }

  removeCategory(category: Category) {
    this.trackCategoryService.remove(category.id);
  }

  addCategory() {
    this.trackCategoryService.create(this.newCategory)
      .subscribe(() => this.notifyService.notify('Created'));
    this.newCategory = '';
  }

  track(category: Category) {
    this.timeTrackService.update(category.name);
  }
}