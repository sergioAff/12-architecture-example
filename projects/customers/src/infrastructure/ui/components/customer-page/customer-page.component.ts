import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CustomerCardComponent } from '../../components/customer-card/customer-card.component';
import {
  PageTitleComponent,
  AddComponent,
  BgImgageComponent,
  NoDataLabelComponent,
} from 'shared';
import { ICustomer } from '../../../../domain/model/customer';

@Component({
  selector: 'lib-customer-page',
  imports: [
    CustomerCardComponent,
    PageTitleComponent,
    AddComponent,
    BgImgageComponent,
    NoDataLabelComponent,
  ],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.scss',
})
export class CustomerPageComponent {
  title = 'Customers';
  addLink = '/customer/add';
  srcImage = 'customer.png';
  altImage = 'Customers';
  titleImage = 'Customers';

  @Input() customers: ICustomer[] = [];
}
