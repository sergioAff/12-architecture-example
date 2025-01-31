import { Component, Input } from '@angular/core';
import {
  AddComponent,
  BgImgageComponent,
  NoDataLabelComponent,
  PageTitleComponent,
} from 'shared';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { IReservationResponse } from '../../../../domain/model/reservation.interface';

@Component({
  selector: 'lib-reservation-page',
  imports: [
    PageTitleComponent,
    AddComponent,
    BgImgageComponent,
    ReservationCardComponent,
    NoDataLabelComponent,
  ],
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.scss',
})
export class ReservationPageComponent {
  title = 'Reservations';
  addLink = '/reservations/add';
  srcImage = 'reservation.png';
  altImage = 'Restaurant';
  titleImage = 'Reservations';

  @Input() reservations: IReservationResponse[] = [];
}
