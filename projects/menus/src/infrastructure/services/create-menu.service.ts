import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenuResonse } from '../../domain/model/menuResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuService {
  private http = inject(HttpClient);

  execute(menu: Partial<IMenuResonse>): Observable<IMenuResonse> {
    return this.http.post<IMenuResonse>('http://localhost:8080/menus', menu, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
