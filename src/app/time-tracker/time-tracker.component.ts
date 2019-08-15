import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
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
export class TimeTrackerComponent implements OnChanges {
  @Input() date: string;

  categories$ = this.trackCategoryService.list();
  timeTable$: Observable<TimeTable>;

  newCategory: string = '';
  
  constructor(
    private trackCategoryService: TrackCategoryService,
    private timeTrackService: TimeTrackService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) {
      this.updateTimeTable();
    }
  }

  private updateTimeTable() {
    if (this.date) {
      this.timeTable$ = this.timeTrackService.getTable(this.date);
      return;
    }

    this.timeTable$ = null;
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
    this.timeTrackService.getTable(this.date).pipe(
      tap(table => {
        const currentValue = table.hours[name];
        const newValue = prompt('New value', String(currentValue));

        if (newValue !== null) {
          const parsedValue = parseFloat(newValue);
          table.hours[name] = isNaN(parsedValue) ? currentValue : parsedValue;
        }
      }),
      switchMap(table => this.timeTrackService.update(table))
    )
    .subscribe(() => this.updateTimeTable());
  }
}