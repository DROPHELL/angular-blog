import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /* ===== PRIVATE ===== */

  private getStorageKey(): string | null {
    const userId = this.authService.getUserId();
    return userId ? `blog_favorites_${userId}` : null;
  }

  /* ===== PUBLIC ===== */

  getFavorites(): string[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    const key = this.getStorageKey();
    if (!key) return [];

    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  isFavorite(postId: string): boolean {
    return this.getFavorites().includes(postId);
  }

  toggleFavorite(postId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const key = this.getStorageKey();
    if (!key) return;

    const favorites = this.getFavorites();

    if (favorites.includes(postId)) {
      favorites.splice(favorites.indexOf(postId), 1);
    } else {
      favorites.push(postId);
    }

    localStorage.setItem(key, JSON.stringify(favorites));
  }
}
