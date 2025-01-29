import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { CreateCustomerComponent } from '../containers/create-customer/create-customer.component';

export const customersRoutes: Routes = [
  {
    path: 'customers',
    component: MainLayoutComponent,
    children: [
      {
        path: 'create',
        component: CreateCustomerComponent,
      },
    ],
  },
];
