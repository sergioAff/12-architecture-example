import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateFactory } from 'shared';
import { IReservationResponse } from '../model/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationsState {
  private readonly _factory = inject(StateFactory);
  private readonly _reservations = new BehaviorSubject<IReservationResponse[]>(
    []
  );

  store() {
    return {
      reservations: this._factory.state(this._reservations),
    };
  }
}
