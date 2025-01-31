import { inject, Injectable } from '@angular/core';
import { CreateReservationService } from '../infrastructure/services/create-reservation.service';

@Injectable({
  providedIn: 'root',
})
export class CreateReservationUseCase {
  private readonly _service = inject(CreateReservationService);
}
