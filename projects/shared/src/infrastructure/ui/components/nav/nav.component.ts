import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INavRoute } from '../../../../domain/model/navRouter.interface';
import { LogoComponent } from '../logo/logo.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [LogoComponent, RouterLink, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isRouteActive(routePath: string): boolean {
    return this.router.url === routePath;
  }

  navRoutes: INavRoute[] = [
    { name: 'Customer', path: '/customers', icon: 'person' },
    { name: 'Dish', path: '/dishes', icon: 'restaurant' },
    { name: 'Menu', path: '/menus', icon: 'menu_book' },
    { name: 'Reservation', path: '/reservations', icon: 'event' },
    { name: 'Order', path: '/orders', icon: 'shopping_cart' },
  ];
}
