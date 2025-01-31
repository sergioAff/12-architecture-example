import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteReservationUseCase } from '../../../../application/delete-reservation.usecase';
import { IReservationResponse } from '../../../../domain/model/reservation.interface';
import { BtnsActionsComponent, ConfirmModalComponent } from 'shared';

@Component({
  selector: 'lib-reservation-card',
  imports: [BtnsActionsComponent, ConfirmModalComponent, DatePipe],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss',
})
export class ReservationCardComponent {
  @Input() reservation!: IReservationResponse;
  isModalOpen: boolean = false;

  private readonly _useCase = inject(DeleteReservationUseCase);
  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this._useCase.initSubscription();
    this._useCase.execute(this.reservation.id);
    this.closeModal();
  }

  editReservation(): void {
    this.router.navigate(['/reservations/edit', this.reservation.id]);
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }
}
