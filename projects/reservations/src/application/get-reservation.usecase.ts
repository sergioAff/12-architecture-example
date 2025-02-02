import { inject, Injectable } from '@angular/core';
import { ReservationState } from '../domain/state';
import { map, Observable, Subscription, tap } from 'rxjs';
import { IReservationResponse } from '../domain/model/reservation.interface';
import { GetReservationService } from '../infrastructure/services/get-reservation.service';

@Injectable({
  providedIn: 'root',
})
export class GetReservationUseCase {
  private readonly _service = inject(GetReservationService);
  private readonly _state = inject(ReservationState);
  private subscriptions: Subscription = new Subscription();

  reservations$(id: number): Observable<IReservationResponse> {
    return this._state.reservations.reservations
      .$()
      .pipe(
        map((reservations: IReservationResponse[]) =>
          reservations.find(
            (reservation: IReservationResponse) => reservation.id === id
          )
        )
      );
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .execute(id)
        .pipe(
          tap((updatedReservation: IReservationResponse) => {
            const currentReservations =
              this._state.reservations.reservations.snapshot();
            const updatedReservations = currentReservations.map((reservation) =>
              reservation.id === id ? updatedReservation : reservation
            );
            this._state.reservations.reservations.set(updatedReservations);
          })
        )
        .subscribe()
    );
  }
}
