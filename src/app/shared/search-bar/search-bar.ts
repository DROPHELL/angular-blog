import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html'
})
export class SearchBarComponent {
  filterText = '';

  @Output() name = new EventEmitter<string>();

  sendFilter(): void {
    this.name.emit(this.filterText.toLowerCase());
  }
}
