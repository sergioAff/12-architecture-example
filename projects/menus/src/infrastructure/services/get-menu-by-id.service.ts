import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenuResonse } from '../../domain/model/menuResponse';

@Injectable({
  providedIn: 'root',
})
export class GetMenuByIdService {
  private http = inject(HttpClient);

  execute(id: number): Observable<IMenuResonse> {
    return this.http.get<IMenuResonse>(`http://localhost:8080/menu/${id}`);
  }
}
