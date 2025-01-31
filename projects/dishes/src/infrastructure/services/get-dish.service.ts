import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../domain/model/dish';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDishService {
  private http = inject(HttpClient);

  execute(id: number): Observable<IDish> {
    return this.http.get<IDish>(`http://localhost:8080/dishes/${id}`);
  }
}
