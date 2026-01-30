import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface RatingData {
  total: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private readonly STORAGE_KEY = 'blog_ratings';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getAllRatings(): Record<string, RatingData> {
    if (!isPlatformBrowser(this.platformId)) return {};
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  private saveAllRatings(data: Record<string, RatingData>): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  addRating(postId: string, rating: number): void {
    const ratings = this.getAllRatings();

    if (!ratings[postId]) {
      ratings[postId] = { total: 0, count: 0 };
    }

    ratings[postId].total += rating;
    ratings[postId].count += 1;

    this.saveAllRatings(ratings);
  }

  getAverage(postId: string): number {
    const ratings = this.getAllRatings();
    const r = ratings[postId];
    return r && r.count > 0 ? r.total / r.count : 0;
  }

  getCount(postId: string): number {
    const ratings = this.getAllRatings();
    return ratings[postId]?.count || 0;
  }
}
