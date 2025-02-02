import { inject, Injectable } from '@angular/core';
import { GetAllReservationService } from '../infrastructure/services/get-all-reservation.service';
import { ReservationState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IReservationResponse } from '../domain/model/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class GetALlReservationUseCase {
  private readonly _service = inject(GetAllReservationService);
  private readonly _state = inject(ReservationState);
  private subscriptions: Subscription = new Subscription();

  reservation$(): Observable<IReservationResponse[]> {
    return this._state.reservations.reservations.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(
          tap((reservation$: IReservationResponse[]) =>
            this._state.reservations.reservations.set(reservation$)
          )
        )
        .subscribe()
    );
  }
}
