import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteReservationService {
  private http = inject(HttpClient);

  execute(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/reservations/${id}`);
  }
}
