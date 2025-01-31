import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('customers').then((m) => m.customersRoutes),
  },
  {
    path: 'dishes',
    component: MainLayoutComponent,
    loadChildren: () => import('dishes').then((m) => m.dishesRoutes),
  },
  {
    path: 'menus',
    component: MainLayoutComponent,
    loadChildren: () => import('menus').then((m) => m.menusRoutes),
  },
  {
    path: 'orders',
    component: MainLayoutComponent,
    loadChildren: () => import('orders').then((m) => m.ordersRoutes),
  },
];
