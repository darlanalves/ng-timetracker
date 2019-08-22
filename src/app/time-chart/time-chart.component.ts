import { Component, OnInit } from '@angular/core';
import { TimeTrackService } from '../time-track/time-track.service';
import { TrackCategoryService } from '../time-track/track-category.service';
import { ILineChartOptions, IChartistAnimationOptions, IChartistData } from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const maxHours = 12;

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.scss']
})
export class TimeChartComponent implements OnInit {
  chartType: ChartType = 'Line';
  data$: Observable<{ weekly: IChartistData, total: IChartistData }>;
  weeklyOptions: ILineChartOptions = {
    showArea: true,
    showLine: true,
    showPoint: false,
    fullWidth: true,
    axisX: {
      showLabel: true,
      showGrid: false,
    },
    axisY: {
      showLabel: false,
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
      this.timeTrackService.list().pipe(map(h => h.reverse())),
    ).pipe(
      map(([categories, history]) => {
        const labels = categories.map(label => label.name);
        const emptyHours = {};
        labels.forEach(label => emptyHours[label] = 0);
        
        const hourRange = Array.from({ length: maxHours }).map((_, i) => i + 1);
        const days = history.map(entry => entry.date.slice(5));
        
        const weekly = labels.map(label => {
          const series = {
            name: label,
            data: history.map(entry => {
              const value = (entry.hours[label] || 0) / maxHours;
              return { x: entry.date.slice(5), y: value };
            })
          };

          return series;
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
            labels: days,
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