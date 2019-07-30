import { apiEndpoint } from '../environment';
import { HttpClient } from '@angular/common/http';
import uuid from 'uuid/v4';
import { map } from 'rxjs/operators';
import { Category } from './category';

export class TrackCategoryService {
  constructor(private http: HttpClient) {}
  
  list() {
    return this.http.get<Category>(`${apiEndpoint}/category`);
  }

  create(name: string) {
    const id = uuid();
    return this.http.post(`${apiEndpoint}/category/${id}`, { id, name }).pipe(
      map(() => id)
    );
  }

  delete(id: string) {
    return this.http.delete(`${apiEndpoint}/category/${id}`);
  }
}