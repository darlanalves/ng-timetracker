import { Component } from '@angular/core';
import { TrackCategoryService } from '../time-track/track-category.service';
import { TimeTrackService } from '../time-track/time-track.service';
import { NotifyService } from '../notify/notify.service';
import { Category } from '../time-track/category';
import { TimeTable } from '../time-track/time-table';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent {
  addForm = this.fb.group({
    newCategory: ['', Validators.required]
  });
  
  categories$ = this.trackCategoryService.list();
  timeTable$: Observable<TimeTable>;

  newCategory: string = '';
  
  constructor(
    private trackCategoryService: TrackCategoryService,
    private timeTrackService: TimeTrackService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
  ) {
    this.updateTimeTable();
  }

  private updateTimeTable() {
    this.timeTable$ = this.timeTrackService.getTable(this.timeTrackService.today);
  }

  removeCategory(category: Category) {
    this.trackCategoryService.remove(category.id)
      .subscribe(() => this.notifyService.notify('Removed'));
  }

  addCategory() {
    const newCategory = this.addForm.controls.newCategory.value;
    
    this.trackCategoryService.create(newCategory)
      .subscribe(() => this.notifyService.notify('Created'));
    
    this.addForm.setValue({ newCategory: '' });
  }

  track(category: Category) {
    this.timeTrackService.update(category.name);
  }
}