import { Component, Input } from '@angular/core';
import { TimerService, TimerTable } from '../timer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.scss']
})
export class TimerComponent  {
  history$: Observable<TimerTable[]>;

  constructor(private service: TimerService) {
    this.refresh();
  }

  updateTimer(timer: string) {
    this.service.update(timer).subscribe(() => this.refresh());
  }

  refresh() {
    this.history$ = this.service.history();
  }

  remove(date: string) {
    if (confirm('For sure?')) {
      this.service.remove(date).subscribe(() => this.refresh());
    }
  }
}
