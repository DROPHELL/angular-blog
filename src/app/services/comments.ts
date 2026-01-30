import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Comment {
  author: string;
  text: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private readonly STORAGE_KEY = 'blog_comments';
  private comments: { [key: string]: Comment[] } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.STORAGE_KEY);
      this.comments = data ? JSON.parse(data) : {};
    }
  }

  private saveToStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.comments));
    }
  }

  getComments(postId: string): Comment[] {
    return this.comments[postId] || [];
  }

  addComment(postId: string, comment: Comment): void {
    if (!this.comments[postId]) {
      this.comments[postId] = [];
    }

    this.comments[postId].push(comment);
    this.saveToStorage();
  }
}
