import { Component, OnInit } from '@angular/core';
import { TimeTrackService } from '../time-track/time-track.service';
import { TrackCategoryService } from '../time-track/track-category.service';
import { ILineChartOptions, IChartistAnimationOptions, IChartistData } from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
})
export class TimeChartComponent implements OnInit {
  chartType: ChartType = 'Line';
  data$: Observable<IChartistData>;
  options: ILineChartOptions = {
    high: 3,
    low: -3,
    showArea: true,
    showLine: false,
    showPoint: false,
    fullWidth: true,
    axisX: {
      showLabel: false,
      showGrid: false
    },
    height: 300,
  };

  constructor(
    private timeTrackService: TimeTrackService,
    private trackCategoryService: TrackCategoryService,
  ) { }

  ngOnInit() {
    this.data$ = forkJoin(
      this.trackCategoryService.list(),
      this.timeTrackService.list(),
    ).pipe(
      map(([labels, history]) => {
        const series = history.map(entry => {
          const output = [];
          labels.forEach(label => output.push(entry.hours[label.name] || 0));
          
          return output;
        });

        console.log({ 
          labels: labels.map(label => label.name), 
          series
        });
        return { 
          labels: labels.map(label => label.name), 
          series
        };
      })
    );

    this.data$.subscribe(output => console.log(output), output => console.log(output));
  }

}