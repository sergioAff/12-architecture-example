import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReservationResponse } from '../../domain/model/reservation.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditReservationService {
  private http = inject(HttpClient);

  execute(
    id: number,
    reservation: Partial<IReservationResponse>
  ): Observable<IReservationResponse> {
    return this.http.put<IReservationResponse>(
      `http://localhost:8080/reservations/${id}`,
      reservation
    );
  }
}
