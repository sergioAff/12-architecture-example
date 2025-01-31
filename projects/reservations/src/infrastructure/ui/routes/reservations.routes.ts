import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';
import { ListReservationsComponent } from '../containers/list-reservations/list-reservations.component';

export const reservationsRoutes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: ListReservationsComponent,
      },
    ],
  },
];
