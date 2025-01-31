import { Component, inject } from '@angular/core';
import { ReservationPageComponent } from '../../components/reservation-page/reservation-page.component';
import { AsyncPipe } from '@angular/common';
import { GetALlReservationUseCase } from '../../../../application/get-all-reservation.usecase';
import { Observable } from 'rxjs';
import { IReservationResponse } from '../../../../domain/model/reservation.interface';

@Component({
  selector: 'lib-list-reservations',
  imports: [ReservationPageComponent, AsyncPipe],
  templateUrl: './list-reservations.component.html',
})
export class ListReservationsComponent {
  public readonly _useCase = inject(GetALlReservationUseCase);
  public reservations$: Observable<IReservationResponse[]>;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.getAllReservations();
    this.reservations$ = this._useCase.reservation$();
  }

  getAllReservations(): void {
    this._useCase.execute();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }
}
