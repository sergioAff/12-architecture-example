import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../domain/model/dish';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateDishService {
  private https = inject(HttpClient);

  execute(dish: Partial<IDish>): Observable<IDish> {
    return this.https.post<IDish>('http://localhost:8080/dishes', dish, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
