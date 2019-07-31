import { Component } from '@angular/core';
import { NotifyService } from './notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
})
export class NotifyComponent {
  notifications$ = this.notifyService.getQueue();

  constructor(private notifyService: NotifyService) {}
}