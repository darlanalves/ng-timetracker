import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  list$ = new BehaviorSubject<string>('');
  private clearTimer = 0;

  getQueue() {
    return this.list$;
  }

  hide() {
    clearTimeout(this.clearTimer);
    this.list$.next('');
  }

  notify(notification: string) {
    clearTimeout(this.clearTimer);
    this.list$.next(notification);
    this.clearTimer = setTimeout(() => this.list$.next(''), 5000);
  }
}