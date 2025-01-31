import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';
import { ListOrdersComponent } from '../containers/list-orders/list-orders.component';

export const ordersRoutes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: ListOrdersComponent,
      },
    ],
  },
];
