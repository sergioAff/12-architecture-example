import { Routes } from '@angular/router';
import { ListMenusComponent } from '../containers/list-menus/list-menus.component';
import { BodyLayoutComponent } from 'shared';

export const menusRoutes: Routes = [
  {
    path: '',
    component: BodyLayoutComponent,
    children: [
      {
        path: '',
        component: ListMenusComponent,
      },
    ],
  },
];
