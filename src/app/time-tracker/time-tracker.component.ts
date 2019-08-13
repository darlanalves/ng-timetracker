import { Component, Input } from '@angular/core';
import { TrackCategoryService } from '../time-track/track-category.service';
import { TimeTrackService } from '../time-track/time-track.service';
import { NotifyService } from '../notify/notify.service';
import { Category } from '../time-track/category';
import { TimeTable } from '../time-track/time-table';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent {
  @Input() date: string;

  categories$ = this.trackCategoryService.list();
  timeTable$: Observable<TimeTable>;

  newCategory: string = '';
  
  constructor(
    private trackCategoryService: TrackCategoryService,
    private timeTrackService: TimeTrackService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
  ) {
    this.updateTimeTable();
  }

  private updateTimeTable() {
    this.timeTable$ = this.timeTrackService.getTable(this.date);
  }

  removeCategory(category: Category) {
    this.trackCategoryService.remove(category.id)
      .subscribe(() => this.notifyService.notify('Removed'));
  }

  track({ name }: Category) {
    this.timeTrackService.track(name)
      .subscribe(() => {
        this.notifyService.notify(`Tracking ${name}`);
        this.trackCategoryService.refresh();
        this.updateTimeTable();
      });
  }

  edit({ name }: Category) {
    this.timeTrackService.getTable(this.timeTrackService.today).pipe(
      tap(table => {
        const currentValue = table.hours[name];
        table.hours[name] = parseFloat(prompt('New value', String(currentValue))) || currentValue;
      }),
      switchMap(table => this.timeTrackService.update(table))
    )
    .subscribe(() => this.updateTimeTable());
  }
}