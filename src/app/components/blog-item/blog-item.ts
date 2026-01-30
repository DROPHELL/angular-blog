import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlogItemImageComponent } from '../blog-item-image/blog-item-image';
import { BlogItemTextComponent } from '../blog-item-text/blog-item-text';
import { FavoritesService } from '../../services/favorites';
import { RatingComponent } from '../../shared/rating/rating';
import { DataService } from '../../services/data';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'blog-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BlogItemImageComponent,
    BlogItemTextComponent,
    RatingComponent
  ],
  templateUrl: './blog-item.html',
  styleUrls: ['./blog-item.scss']
})
export class BlogItemComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string;
  @Input() text!: string;
  @Input() image!: string;
  @Input() author!: string;

  @Output() deleted = new EventEmitter<string>();

  likesCount = 0;
  likedByUser = false;
  loadingLike = false;

  constructor(
    private favoritesService: FavoritesService,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.dataService.getById(this.id).subscribe(post => {
      this.likesCount = post.likesCount;
      this.likedByUser = post.likedByUser;
    });
  }

  toggleLike(): void {
    if (!this.authService.isLoggedIn() || this.loadingLike) return;

    this.loadingLike = true;

    const req$ = this.likedByUser
      ? this.dataService.unlikePost(this.id)
      : this.dataService.likePost(this.id);

    req$.subscribe({
      next: res => {
        this.likesCount = res.likes;
        this.likedByUser = !this.likedByUser;
        this.loadingLike = false;
      },
      error: () => {
        this.loadingLike = false;
      }
    });
  }

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.id);
  }

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.id);
  }

  isAuthor(): boolean {
    return this.authService.currentUser?.login === this.author;
  }

  deletePost(): void {
    if (!confirm('Czy na pewno chcesz usunąć post?')) return;

    this.dataService.deletePost(this.id).subscribe(() => {
      this.deleted.emit(this.id);
    });
  }
}
