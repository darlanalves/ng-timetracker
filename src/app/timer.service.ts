import { Injectable } from '@angular/core';
import { of, from, Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

const headers = {
  'Content-Type': 'application/json',
};
const leftpad = (n: number) => n < 10 ? String('0' + n) : String(n);
const endpoint = 'https://www.jsonstore.io/0cc36f1fdfe3090bf2efd8632546d0e3a841aa046ed3adb4c93491df79f1a7c0';
const timersEndpoint = `${endpoint}/timers`;

export class TimerTable {
  lastUpdated = Date.now();
  date: string;
  current: string;
  
  admin = 0;
  develop = 0;
  refactor = 0;
  release = 0;
  other = 0;

  constructor(properties: Partial<TimerTable>) {
    Object.assign(this, properties);
    
    this.admin = Number(this.admin);
    this.develop = Number(this.develop);
    this.refactor = Number(this.refactor);
    this.release = Number(this.release);
    this.other = Number(this.other);
  }

  get elapsedTime(): number {
    const elapsedSeconds = Math.floor((Date.now() - this.lastUpdated) / 1000);
    const hours = Math.round(elapsedSeconds / 3600 * 10) / 10;
    
    return hours > 0.25 ? hours : 0;
  }

  toJSON() {
    return {
      lastUpdated: this.lastUpdated,
      date: this.date,
      admin: this.admin.toFixed(2),
      develop: this.develop.toFixed(2),
      refactor: this.refactor.toFixed(2),
      release: this.release.toFixed(2),
      other: this.other.toFixed(2),
      current: this.current,
    }
  }
}

interface TimerTableMap {
  [k: string]: TimerTable;
}

@Injectable({ 
  providedIn: 'root'
})
export class TimerService {
  private latest: TimerTable;

  constructor() {
    this.getTable(this.today).subscribe(t => this.latest = t);
  }

  get today() {
    const d = new Date();
    return `${ leftpad(d.getFullYear()) }-${ leftpad(d.getMonth()+1) }-${ leftpad(d.getDate()) }`;
  }

  history(): Observable<TimerTable[]> {
    const list = fetch(timersEndpoint).then(t => t.json());
    
    return from(list).pipe(
      map(response => response.result as TimerTableMap),
      map(timerTableMap => Object.values(timerTableMap)),
      tap(timers => this.sortTimerTableList(timers)),
      map(timers => timers.map(t => new TimerTable(t))),
    );
  }

  getTable(date: string) {
    const table = fetch(`${timersEndpoint}/${date}`).then(t => t.json());
    
    return from(table).pipe(
      catchError(() => of(new TimerTable({ date: this.today }))),
      map(response => new TimerTable(response.result)),
    );
  }

  private sortTimerTableList(timers: TimerTable[]) {
    timers.sort((a, b) => a.date < b.date ? 1 : -1);
  }

  update(timer: string) {
    const date = this.today;

    return this.getTable(date).pipe(
      switchMap((previous) => {
        const table = new TimerTable({
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