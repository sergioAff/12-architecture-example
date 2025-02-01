import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';
import { ListReservationsComponent } from '../containers/list-reservations/list-reservations.component';
import { ContainerReservationFormComponent } from '../containers/container-reservation-form/container-reservation-form.component';

export const reservationsRoutes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: ListReservationsComponent,
      },
      {
        path: 'add',
        component: ContainerReservationFormComponent,
      },

      {
        path: 'edit/:id',
        component: ContainerReservationFormComponent,
      },
    ],
  },
];
