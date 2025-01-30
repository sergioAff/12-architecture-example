import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrderRequests } from '../../domain/model/orderRequest';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderService {
  private http = inject(HttpClient);

  execute(order: IOrderRequests): Observable<IOrderRequests> {
    if (order.dishIds) {
      order.dishIds = order.dishIds.map((dishId) =>
        parseInt(dishId.toString(), 10)
      );
    }

    if (order.reservationId) {
      order.reservationId = parseInt(order.reservationId.toString(), 10);
    }

    return this.http
      .post<IOrderRequests>('http://localhost:8080/orders', order, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
