import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../domain/model/dish';

@Injectable({
  providedIn: 'root',
})
export class GetAllDishesService {
  private http = inject(HttpClient);

  execute(): Observable<IDish[]> {
    return this.http.get<IDish[]>('http://localhost:8080/dishes');
  }
}
