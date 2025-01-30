import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';
import { ListCustomersComponent } from '../containers/list-customers/list-customers.component';
import { HomeComponent } from '../containers/home/home.component';

export const customersRoutes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'customers',
        component: ListCustomersComponent,
      },
    ],
  },
];
