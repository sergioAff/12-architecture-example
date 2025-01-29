import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('customers').then((m) => m.customersRoutes),
  },
];
