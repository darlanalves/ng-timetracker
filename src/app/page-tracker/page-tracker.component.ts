import { Component } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeTrackService } from '../time-track/public_api';
import { TrackCategoryService } from '../time-track/public_api';
import { NotifyService } from '../notify/notify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-tracker',
  templateUrl: './page-tracker.component.html',
})
export class PageTrackerComponent {
  addForm = this.fb.group({
    newCategory: ['', Validators.required]
  });
  
  date: string;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private trackerService: TimeTrackService,
    private categoryService: TrackCategoryService,
    private notifyService: NotifyService,
    private route: ActivatedRoute,
  ) { 
    this.route.params.subscribe((params => {
      this.date = params.date || this.trackerService.today;
    }));
  }

  onAddClick() {
    this.modalService.open('add-category');
  }

  addCategory() {
    const newCategory = this.addForm.value.newCategory;
    
    this.categoryService.create(newCategory)
      .subscribe(() => this.notifyService.notify('Created'));
    
    this.addForm.setValue({ newCategory: '' });
  }

}