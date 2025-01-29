import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-btns-actions',
  imports: [],
  templateUrl: './btns-actions.component.html',
  styleUrl: './btns-actions.component.scss',
})
export class BtnsActionsComponent {
  @Output() editAction = new EventEmitter<void>();
  @Output() deleteAction = new EventEmitter<void>();

  onDelete(): void {
    this.deleteAction.emit();
  }

  onEdit(): void {
    this.editAction.emit();
  }
}
