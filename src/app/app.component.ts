import { Component } from '@angular/core';
import { TimerService } from './timer/timer.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(private timerService: TimerService) {}
  get today() {
    return this.timerService.today;
  }
}
