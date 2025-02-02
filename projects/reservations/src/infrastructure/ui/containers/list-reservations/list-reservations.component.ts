import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReservationPageComponent } from '../../components/reservation-page/reservation-page.component';
import { AsyncPipe } from '@angular/common';
import { GetALlReservationUseCase } from '../../../../application/get-all-reservation.usecase';
import { Observable, Subscription, interval } from 'rxjs';
import { IReservationResponse } from '../../../../domain/model/reservation.interface';
import { switchMap } from 'rxjs/operators';
import { DeleteReservationUseCase } from '../../../../application/delete-reservation.usecase';

@Component({
  selector: 'lib-list-reservations',
  imports: [ReservationPageComponent, AsyncPipe],
  templateUrl: './list-reservations.component.html',
})
export class ListReservationsComponent implements OnInit, OnDestroy {
  public readonly _useCase = inject(GetALlReservationUseCase);
  public readonly _useCaseDelete = inject(DeleteReservationUseCase);
  public reservations$: Observable<IReservationResponse[]>;
  private intervalSubscription: Subscription;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.reservations$ = this._useCase.reservation$();

    this.intervalSubscription = interval(100)
      .pipe(switchMap(async () => this._useCase.execute()))
      .subscribe();
  }

  onRequestDelete(reservationId: number): void {
    this._useCaseDelete.initSubscription();
    this._useCaseDelete.execute(reservationId);
    this._useCaseDelete.destroySubscription();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
