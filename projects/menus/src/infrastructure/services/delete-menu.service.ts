import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuService {
  private http = inject(HttpClient);

  execute(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/menus/${id}`);
  }
}
