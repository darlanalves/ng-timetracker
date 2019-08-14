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
  data$: Observable<{ weekly: IChartistData, total: IChartistData }>;
  weeklyOptions: ILineChartOptions = {
    high: 10,
    low: 0,
    showArea: true,
    showLine: false,
    showPoint: false,
    fullWidth: true,
    axisX: {
      showLabel: true,
      showGrid: false,
    },
    axisY: {
      onlyInteger: true,
    },
    height: 300,
  };
  totalOptions = {
    distributeSeries: true,
    height: 300,
  }

  constructor(
    private timeTrackService: TimeTrackService,
    private trackCategoryService: TrackCategoryService,
  ) { }

  ngOnInit() {
    this.data$ = combineLatest(
      this.trackCategoryService.list(),
      this.timeTrackService.list(),
    ).pipe(
      map(([categories, history]) => {
        const labels = categories.map(label => label.name);
        const emptyHours = {};
        labels.forEach(label => emptyHours[label] = 0);

        const weekly = history.map(entry => {
          // const output = [];
          // labels.forEach(label => output.push(entry.hours[label] || 0));
          return Object.values({ ...emptyHours, ...entry.hours });
          
          // return output;
        });
        
        const weeklySum = history.reduce((output, entry) => {
          labels.forEach(label => {
            if (!output[label]) { output[label] = 0; }
            output[label] += (entry.hours[label] || 0)
          });
          return output;
        }, {});

        const totals = Object.values(weeklySum);

        return {
          weekly: { 
            labels,
            series: weekly,
          },
          total: {
            labels,
            series: totals,
          }
        };
      })
    );
  }

}