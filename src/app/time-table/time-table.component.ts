import { Component, Input } from '@angular/core';
import { TimeTable } from '../time-track/time-table';
import { Category } from '../time-track/category';
import { TimeTrackService } from '../time-track/time-track.service';
import { TrackCategoryService } from '../time-track/track-category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent {
  history$: Observable<TimeTable[]>;
  category$: Observable<Category[]>;

  get today() {
    return this.timeTrackService.today;
  }

  constructor(
    private timeTrackService: TimeTrackService,
    private trackCategoryService: TrackCategoryService,
  ) {
    this.history$ = this.timeTrackService.list();
    this.category$ = this.trackCategoryService.list();
  }

  track(timer: string) {
    this.timeTrackService.update(timer);
  }

  remove(date: string) {
    if (confirm('For sure?')) {
      this.timeTrackService.remove(date);
    }
  }
}
