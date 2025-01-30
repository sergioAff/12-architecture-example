import { Component, Input } from '@angular/core';
import {
  AddComponent,
  BgImgageComponent,
  NoDataLabelComponent,
  PageTitleComponent,
} from 'shared';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { IDish } from 'projects/dishes/src/domain/model/dish';

@Component({
  selector: 'lib-dish-page',
  imports: [
    PageTitleComponent,
    AddComponent,
    BgImgageComponent,
    DishCardComponent,
    NoDataLabelComponent,
  ],
  templateUrl: './dish-page.component.html',
  styleUrl: './dish-page.component.scss',
})
export class DishPageComponent {
  title = 'Dishes';
  addLink = '/dish/add';
  srcImage = 'dish.png';
  altImage = 'Dishes';
  titleImage = 'Dishes';

  @Input() dishes: IDish[] = [];
}
