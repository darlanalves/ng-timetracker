import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, from, Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { TimeTable } from './time-table';

const headers = { 'Content-Type': 'application/json' };
const leftpad = (n: number) => n < 10 ? String('0' + n) : String(n);
const timersEndpoint = `${dataEndpoint}/timers`;

@Injectable({ 
  providedIn: 'root'
})
export class TimeTrackService {
  private list$ = new BehaviorSubject<TimeTable[]>();

  constructor(http: HttpClient) {}

  get today() {
    const d = new Date();
    return `${ leftpad(d.getFullYear()) }-${ leftpad(d.getMonth()+1) }-${ leftpad(d.getDate()) }`;
  }

  list() {
    return this.list$;
  }

  refresh(): Observable<TimeTable[]> {
    return this.http.get(timersEndpoint).pipe(
      map(response => Object.values(response.result)),
      map(timers => timers.map(t => new TimeTable(t))),
    ).pipe(this.list$);
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

        return this.http.put(`${timersEndpoint}/${date}`, JSON.stringify(table), { headers });
      }),
      tap(() => this.refresh()),
    );
  }

  remove(date: string) {
    return this.http.delete(`${timersEndpoint}/${date}`).pipe(
      tap(() => this.refresh())
    );
  }
}