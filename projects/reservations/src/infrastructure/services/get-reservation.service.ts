import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReservationResponse } from '../../domain/model/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class GetReservationService {
  private http = inject(HttpClient);

  execute(id: number): Observable<IReservationResponse> {
    return this.http.get<IReservationResponse>(
      `http://localhost:8080/reservations/${id}`
    );
  }
}
