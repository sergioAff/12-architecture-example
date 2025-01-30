import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-form-title',
  imports: [],
  templateUrl: './form-title.component.html',
  styleUrl: './form-title.component.scss',
})
export class FormTitleComponent {
  @Input() title!: string;
}
