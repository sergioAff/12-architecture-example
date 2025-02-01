import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeleteReservationService {
  private http = inject(HttpClient);

  execute(id: number): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:8080/reservations/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert(
      'The reservation is registered in an order. Please delete the order  first'
    );
    return throwError(error);
  }
}
