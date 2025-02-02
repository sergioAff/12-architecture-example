import { inject, Injectable } from '@angular/core';
import { EditReservationService } from '../infrastructure/services/edit-reservation.service';
import { ReservationState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IReservationResponse } from '../domain/model/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class EditReservationUseCase {
  private readonly _service = inject(EditReservationService);
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

  execute(id: number, reservation: Partial<IReservationResponse>): void {
    this.subscriptions.add(
      this._service
        .execute(id, reservation)
        .pipe(
          tap((updatedReservation: IReservationResponse) => {
            const currentReservations =
              this._state.reservations.reservations.snapshot();
            const updatedReservations = currentReservations.map((c) =>
              c.id === id ? { ...c, ...updatedReservation } : c
            );
            this._state.reservations.reservations.set(updatedReservations);
          })
        )
        .subscribe()
    );
  }
}
