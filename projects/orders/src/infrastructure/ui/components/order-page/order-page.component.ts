import { Component, Input } from '@angular/core';
import {
  AddComponent,
  BgImgageComponent,
  NoDataLabelComponent,
  PageTitleComponent,
} from 'shared';
import { OrderCardComponent } from '../order-card/order-card.component';
import { IOrderResponse } from '../../../../domain/model/orderResponse';

@Component({
  selector: 'lib-order-page',
  imports: [
    PageTitleComponent,
    AddComponent,
    BgImgageComponent,
    OrderCardComponent,
    NoDataLabelComponent,
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
})
export class OrderPageComponent {
  title = 'Orders';
  addLink = '/orders/add';
  srcImage = 'checkout.png';
  altImage = 'Orders';
  titleImage = 'Orders';

  @Input() orders: IOrderResponse[] = [];
}
