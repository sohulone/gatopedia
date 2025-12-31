import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: string;
  text: string;
}

@Component({
  selector: 'app-selector',
  imports: [CommonModule],
  templateUrl: './selector.html',
  styleUrl: './selector.css',
})
export class Selector {
  @Input() label: string = '';
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() options: SelectOption[] = [];
  @Input() loading: boolean = false;
  @Input() value: string = '';
  @Output() selectionChange = new EventEmitter<string>();

  onSelectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectionChange.emit(select.value);
  }
}
