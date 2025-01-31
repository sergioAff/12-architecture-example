import { inject, Injectable } from '@angular/core';
import { ReservationsState } from './reservation.state';

@Injectable({
  providedIn: 'root',
})
export class ReservationState {
  private readonly _reservations = inject(ReservationsState);

  get reservations() {
    return this._reservations.store();
  }
}
