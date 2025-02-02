import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  @Output() deleteReservation: EventEmitter<number> =
    new EventEmitter<number>();
  isModalOpen: boolean = false;

  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteReservation.emit();
  }

  editReservation(): void {
    this.router.navigate(['/reservations/edit', this.reservation.id]);
  }
}
