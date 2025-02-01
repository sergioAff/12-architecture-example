import { Routes } from '@angular/router';
import { ListMenusComponent } from '../containers/list-menus/list-menus.component';
import { BodyLayoutComponent } from 'shared';
import { ContainerMenusFormComponent } from '../containers/container-menus-form/container-menus-form.component';

export const menusRoutes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: ListMenusComponent,
      },
      {
        path: 'add',
        component: ContainerMenusFormComponent,
      },
      {
        path: 'edit/:id',
        component: ContainerMenusFormComponent,
      },
    ],
  },
];
