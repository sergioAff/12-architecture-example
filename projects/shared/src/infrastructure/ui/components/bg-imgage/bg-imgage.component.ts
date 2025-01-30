import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-bg-imgage',
  templateUrl: './bg-imgage.component.html',
  styleUrl: './bg-imgage.component.scss',
})
export class BgImgageComponent {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() title!: string;
}
