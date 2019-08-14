import { Component, OnInit } from '@angular/core';
import { TimeTrackService } from '../time-track/time-track.service';
import { TrackCategoryService } from '../time-track/track-category.service';
import { ILineChartOptions, IChartistAnimationOptions, IChartistData } from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.scss']
})
export class TimeChartComponent implements OnInit {
  chartType: ChartType = 'Line';
  data$: Observable<IChartistData>;
  options: ILineChartOptions = {
    high: 1,
    low: 0,
    showArea: false,
    showLine: true,
    showPoint: false,
    fullWidth: true,
    axisX: {
      showLabel: true,
      showGrid: false
    },
    height: 500,
  };

  constructor(
    private timeTrackService: TimeTrackService,
    private trackCategoryService: TrackCategoryService,
  ) { }

  ngOnInit() {
    this.data$ = combineLatest(
      this.trackCategoryService.list(),
      this.timeTrackService.list(),
    ).pipe(
      map(([labels, history]) => {
        const series = history.map(entry => {
          const output = [];
          labels.forEach(label => output.push(entry.hours[label.name] || 0));
          
          return output;
        });

        return { 
          labels: labels.map(label => label.name), 
          series
        };
      })
    );

    this.trackCategoryService.refresh();
    this.timeTrackService.refresh();
  }

}