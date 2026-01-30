import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Post } from '../../services/data';
import { BlogItemComponent } from '../blog-item/blog-item';
import { PaginationComponent } from '../../shared/pagination/pagination';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogItemComponent, PaginationComponent],
  templateUrl: './blog.html'
})
export class BlogComponent implements OnInit, OnChanges {

  @Input() filterText = '';

  items: Post[] = [];
  allItems: Post[] = [];

  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 5;
  loading = true;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map(p => Number(p.get('page')) || 1),
        distinctUntilChanged()
      )
      .subscribe(page => {
        this.currentPage = page;
        this.loadPosts();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterText']) {
      this.applyFilter();
    }
  }

  loadPosts(): void {
    this.loading = true;

    this.service.getAll(this.currentPage, this.itemsPerPage).subscribe({
      next: res => {
        this.allItems = res.posts;
        this.totalItems = res.total;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    if (!this.filterText.trim()) {
      this.items = this.allItems;
      return;
    }

    const value = this.filterText.toLowerCase();

    this.items = this.allItems.filter(p =>
      p.title.toLowerCase().includes(value) ||
      p.text.toLowerCase().includes(value)
    );
  }

  onPageChange(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  removeFromList(id: string): void {
    this.items = this.items.filter(p => p.id !== id);
    this.allItems = this.allItems.filter(p => p.id !== id);
  }
}
