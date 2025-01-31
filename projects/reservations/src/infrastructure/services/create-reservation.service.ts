import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReservationResponse } from '../../domain/model/reservation.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateReservationService {
  private http = inject(HttpClient);

  execute(
    reservation: Partial<IReservationResponse>
  ): Observable<IReservationResponse> {
    return this.http.post<IReservationResponse>(
      'http://localhost:8080/reservations',
      reservation,
      {
        headers: this.getHeaders(),
      }
    );
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
