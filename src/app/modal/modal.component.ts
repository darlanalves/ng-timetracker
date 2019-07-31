import { Component, Input } from '@angular/core';
import { ModalService } from './modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.scss' ]
})
export class ModalComponent  {
  isOpen: Observable<boolean>;
  modalName: string;

  @Input()
  modalTitle: string;

  @Input()
  set name(value: string) {
    this.service.unregister(this.modalName);
    this.service.register(value);
    this.isOpen = this.service.isOpen(value);
    this.modalName = value;
  }

  constructor(private service: ModalService) {}

  closeModal() {
    this.service.close(this.modalName);
  }
}
