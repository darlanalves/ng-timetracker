import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modals: { [key: string]: Subject<boolean> } = {};

  register(name) {
    this.modals[name] = new Subject();
  }

  unregister(name) {
    delete this.modals[name];
  }

  open(name) {
    if (name in this.modals) {
      this.modals[name].next(true);
    }
  }

  close(name) {
    if (name in this.modals) {
      this.modals[name].next(false);
    }
  }

  isOpen(name) {
    return this.modals[name] || null;
  }
}