import { Component } from '@angular/core';
import { HomePageComponent } from '../../components/home-page/home-page.component';

@Component({
  selector: 'lib-home',
  imports: [HomePageComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
