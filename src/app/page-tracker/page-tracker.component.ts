import { Component } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeTrackService } from '../time-track/time-track.service';

@Component({
  selector: 'app-page-tracker',
  templateUrl: './page-tracker.component.html',
})
export class PageTrackerComponent {
  addForm = this.fb.group({
    newCategory: ['', Validators.required]
  });

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private trackerService: TimeTrackService,
  ) { }

  get today() {
    return this.trackerService.today;
  }

  onAddClick() {
    this.modalService.open('add-category');
  }

  addCategory() {
    const newCategory = this.addForm.value.newCategory;
    
    this.trackCategoryService.create(newCategory)
      .subscribe(() => this.notifyService.notify('Created'));
    
    this.addForm.setValue({ newCategory: '' });
  }

}