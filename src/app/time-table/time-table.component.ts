import { Component, Input } from '@angular/core';
import { TimerService, TimerTable } from '../timer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimerComponent  {
  history$: Observable<TimerTable[]>;

  get today() {
    return this.timeTrackService.today;
  }

  constructor(private timeTrackService: TimerService) {
    this.refresh();
  }

  updateTimer(timer: string) {
    this.timeTrackService.update(timer).subscribe(() => this.refresh());
  }

  refresh() {
    this.history$ = this.timeTrackService.getHistory();
    this.timers$ = this.timeTrackService.getTimers();
  }

  remove(date: string) {
    if (confirm('For sure?')) {
      this.timeTrackService.remove(date).subscribe(() => this.refresh());
    }
  }
}
