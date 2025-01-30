import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';
import { ListDishesComponent } from '../containers/list-dishes/list-dishes.component';

export const dishesRoutes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: ListDishesComponent,
      },
    ],
  },
];
