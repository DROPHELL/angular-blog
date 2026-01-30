import { Component } from '@angular/core';
import { BlogComponent } from '../blog/blog';
import { SearchBarComponent } from '../../shared/search-bar/search-bar';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [BlogComponent, SearchBarComponent],
  templateUrl: './blog-home.html'
})
export class BlogHomeComponent {

  filterText = '';

  getName(value: string): void {
    this.filterText = value;
  }
}
