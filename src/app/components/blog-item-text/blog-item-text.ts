import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SummaryPipe } from '../../pipes/summary-pipe';

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [CommonModule, RouterModule, SummaryPipe],
  templateUrl: './blog-item-text.html',
  styleUrls: ['./blog-item-text.scss']
})
export class BlogItemTextComponent {
  @Input() text?: string;
  @Input() id?: number | string;
}
