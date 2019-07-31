import { Component } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { FormBuilder, Validators } from '@angular/forms';

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
  ) { }

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