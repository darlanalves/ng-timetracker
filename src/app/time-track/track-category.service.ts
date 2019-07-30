import { apiEndpoint } from '../environment';
import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid/v4';
import { map, tap } from 'rxjs/operators';
import { Category } from './category';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

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
    return this.http.get<Category>(`${apiEndpoint}/category`).pipe(this.list$);
  }

  create(name: string) {
    const id = uuid();
    return this.http.post(`${apiEndpoint}/category/${id}`, { id, name }).pipe(
      map(() => id),
      tap(() => this.refresh()),
    );
  }

  delete(id: string) {
    return this.http.delete(`${apiEndpoint}/category/${id}`).pipe(
      tap(() => this.refresh()),
    );
  }
}