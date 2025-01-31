import { inject, Injectable } from '@angular/core';
import { ReservationState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IReservationResponse } from '../domain/model/reservation.interface';
import { DeleteReservationService } from '../infrastructure/services/delete-reservation.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteReservationUseCase {
  private readonly _service = inject(DeleteReservationService);
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

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .execute(id)
        .pipe(
          tap(() => {
            const currentReservation =
              this._state.reservations.reservations.snapshot();
            const updatedReservation = currentReservation.filter(
              (order) => order.id !== id
            );
            this._state.reservations.reservations.set(updatedReservation);
          })
        )
        .subscribe()
    );
  }
}
