import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenuResonse } from '../../domain/model/menuResponse';

@Injectable({
  providedIn: 'root',
})
export class EditMenuService {
  private http = inject(HttpClient);

  execute(id: number, menu: Partial<IMenuResonse>): Observable<IMenuResonse> {
    return this.http.put<IMenuResonse>(
      `http://localhost:8080/menus/${id}`,
      menu
    );
  }
}
