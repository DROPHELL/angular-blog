import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesService } from '../../services/favorites';
import { DataService, Post } from '../../services/data';
import { BlogItemComponent } from '../blog-item/blog-item';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, BlogItemComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesComponent implements OnInit {

  favoritesPosts: Post[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const favoriteIds = this.favoritesService.getFavorites();

    this.dataService.getAll(1, 1000).subscribe(res => {
      this.favoritesPosts = res.posts.filter(
        p => favoriteIds.includes(p.id)
      );
    });
  }
}
