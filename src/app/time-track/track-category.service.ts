import { apiEndpoint } from '../environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Category } from './category';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { uid } from '../uid';

@Injectable({
  providedIn: 'root',
})
export class TrackCategoryService {
  list$ = new BehaviorSubject<Category[]>([]);
  constructor(private http: HttpClient) {}

  list() {
    return this.list$;
  }

  refresh() {
    return this.http.get<Category[]>(`${apiEndpoint}/category`)
      .subscribe(value => this.list$.next(value));
  }

  create(name: string) {
    const id = uid();
    return this.http.post(`${apiEndpoint}/category/${id}`, { id, name }).pipe(
      map(() => id),
      tap(() => this.refresh()),
    );
  }

  remove(id: string) {
    return this.http.delete(`${apiEndpoint}/category/${id}`).pipe(
      tap(() => this.refresh()),
    );
  }
}