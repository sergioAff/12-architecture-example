import { inject, Injectable } from '@angular/core';
import { CreateReservationService } from '../infrastructure/services/create-reservation.service';
import { ReservationState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IReservationResponse } from '../domain/model/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateReservationUseCase {
  private readonly _service = inject(CreateReservationService);
  private readonly _state = inject(ReservationState);
  private subscriptions: Subscription = new Subscription();

  reservations$(): Observable<IReservationResponse[]> {
    return this._state.reservations.reservations.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(reservation: IReservationResponse): void {
    this.subscriptions.add(
      this._service
        .execute(reservation)
        .pipe(
          tap((newReservation: IReservationResponse) => {
            const currentReservations =
              this._state.reservations.reservations.snapshot();
            this._state.reservations.reservations.set([
              ...currentReservations,
              newReservation,
            ]);
          })
        )
        .subscribe()
    );
  }
}
