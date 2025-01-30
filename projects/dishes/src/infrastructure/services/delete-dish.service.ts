import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteDishService {
  private http = inject(HttpClient);

  execute(id: number): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:8080/dishes/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert(
      'The dish is registered in an order or a menu. Please delete the order or menu first'
    );
    return throwError(error);
  }
}
