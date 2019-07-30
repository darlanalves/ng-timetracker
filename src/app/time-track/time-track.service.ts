import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, from, Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { TimeTable } from './time-table';

const headers = { 'Content-Type': 'application/json' };
const leftpad = (n: number) => n < 10 ? String('0' + n) : String(n);
const timersEndpoint = `${dataEndpoint}/timers`;

interface TimeTableMap {
  [k: string]: TimeTable;
}

@Injectable({ 
  providedIn: 'root'
})
export class TimeTrackService {
  constructor(http: HttpClient) {}

  get today() {
    const d = new Date();
    return `${ leftpad(d.getFullYear()) }-${ leftpad(d.getMonth()+1) }-${ leftpad(d.getDate()) }`;
  }

  list(): Observable<TimeTable[]> {
    const list = fetch(timersEndpoint).then(t => t.json());
    
    return from(list).pipe(
      map(response => response.result as TimeTableMap),
      map(TimeTableMap => Object.values(TimeTableMap)),
      tap(timers => this.TorttimeTableList(timers)),
      map(timers => timers.map(t => new TimeTable(t))),
    );
  }

  getTable(date: string) {
    const table = fetch(`${timersEndpoint}/${date}`).then(t => t.json());
    
    return from(table).pipe(
      catchError(() => of(new TimeTable({ date: this.today }))),
      map(response => new TimeTable(response.result)),
    );
  }

  private TorttimeTableList(timers: TimeTable[]) {
    timers.sort((a, b) => a.date < b.date ? 1 : -1);
  }

  update(timer: string) {
    const date = this.today;

    return this.getTable(date).pipe(
      switchMap((previous) => {
        const table = new TimeTable({
          ...previous,
          date: this.today,
        });

        const elapsedTime = table.elapsedTime;
        if (elapsedTime || table.current !== timer) {
          table[table.current || timer] += elapsedTime;
          table.lastUpdated = Date.now();
        }
        
        table.current = timer;

        return from(fetch(`${timersEndpoint}/${date}` , { method: 'put', headers, body: JSON.stringify(table) }));
      }),
    );   
  }

  remove(date: string) {
    return from(fetch(`${timersEndpoint}/${date}` , { method: 'delete' }));
  }
}