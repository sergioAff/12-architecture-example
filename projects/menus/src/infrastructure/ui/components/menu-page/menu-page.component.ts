import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageTitleComponent } from 'shared';
import { AddComponent } from 'shared';
import { BgImgageComponent } from 'shared';
import { MenuCardComponent } from '../menu-card/menu-card.component';
import { NoDataLabelComponent } from 'shared';
import { IMenuResonse } from '../../../../domain/model/menuResponse';

@Component({
  selector: 'lib-menu-page',
  imports: [
    PageTitleComponent,
    AddComponent,
    BgImgageComponent,
    MenuCardComponent,
    NoDataLabelComponent,
  ],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent {
  @Input() menus: IMenuResonse[] = [];
  title = 'Menus ';
  addLink = '/menus/add';
  srcImage = 'hamburguesa.png';
  altImage = 'hamburguer';
  titleImage = 'Menus';

  @Output() deleteMenu: EventEmitter<number> = new EventEmitter<number>();
}
