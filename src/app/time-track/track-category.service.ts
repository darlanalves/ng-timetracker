import { apiEndpoint } from '../environment';
import { HttpClient } from '@angular/common/http';
import uuid from 'uuid';
import { map } from 'rxjs/operators';

export class TrackCategoryService {
  constructor(private http: HttpClient) {}
  
  list() {
    return this.http.get(`${apiEndpoint}/category`);
  }

  create(name: string) {
    const id = uuid.v4();
    return this.http.post(`${apiEndpoint}/category/${id}`, { id, name }).pipe(
      map(() => id)
    );
  }

  delete(id: string) {
    return this.http.delete(`${apiEndpoint}/category/${id}`);
  }
}