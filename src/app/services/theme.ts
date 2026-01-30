import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly STORAGE_KEY = 'blog_theme';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  initTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem(this.STORAGE_KEY);

    if (saved) {
      document.body.classList.toggle('dark-mode', saved === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.classList.toggle('dark-mode', prefersDark);
      localStorage.setItem(this.STORAGE_KEY, prefersDark ? 'dark' : 'light');
    }
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  isDark(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return document.body.classList.contains('dark-mode');
  }
}
