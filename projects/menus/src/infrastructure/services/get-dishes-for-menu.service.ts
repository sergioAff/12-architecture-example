import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from 'dishes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDishesForMenuService {
  private http = inject(HttpClient);

  execute(): Observable<IDish[]> {
    return this.http.get<IDish[]>('http://localhost:8080/dishes');
  }
}
