import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';
import { ListDishesComponent } from '../containers/list-dishes/list-dishes.component';
import { ContainerDishFormComponent } from '../containers/container-dish-form/container-dish-form.component';

export const dishesRoutes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: ListDishesComponent,
      },
      {
        path: 'add',
        component: ContainerDishFormComponent,
      },
      {
        path: 'edit/:id',
        component: ContainerDishFormComponent,
      },
    ],
  },
];
