import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';
import { ListCustomersComponent } from '../containers/list-customers/list-customers.component';
import { HomeComponent } from '../containers/home/home.component';
import { ContainerFormComponent } from '../containers/customer-form/container-form.component';

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
      {
        path: 'customers/add',
        component: ContainerFormComponent,
      },
      {
        path: 'customers/edit/:id',
        component: ContainerFormComponent,
      },
    ],
  },
];
