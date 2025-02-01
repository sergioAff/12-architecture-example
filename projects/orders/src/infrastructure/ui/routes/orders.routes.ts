import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';
import { ListOrdersComponent } from '../containers/list-orders/list-orders.component';
import { ContainerOrderFormComponent } from '../containers/container-order-form/container-order-form.component';

export const ordersRoutes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: ListOrdersComponent,
      },
      {
        path: 'add',
        component: ContainerOrderFormComponent,
      },
      {
        path: 'edit/:id',
        component: ContainerOrderFormComponent,
      },
    ],
  },
];
