import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerService {
  private http = inject(HttpClient);

  execute(id: number): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:8080/customers/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert(
      'The customer is registered in an order. Please delete the order first'
    );
    return throwError(error);
  }
}
