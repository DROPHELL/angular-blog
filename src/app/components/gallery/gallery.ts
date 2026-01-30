import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Post } from '../../services/data';

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
}

@Component({
  selector: 'gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class GalleryComponent implements OnInit {

  images: GalleryItem[] = [];
  selectedImage: GalleryItem | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    // беремо багато постів, щоб галерея була повна
    this.dataService.getAll(1, 1000).subscribe({
      next: res => {
        this.images = res.posts
          .filter((post: Post) => !!post.image)
          .map((post: Post) => ({
            id: post.id,
            imageUrl: post.image,
            title: post.title
          }));
      },
      error: () => {
        this.images = [];
      }
    });
  }

  openLightbox(item: GalleryItem): void {
    this.selectedImage = item;
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }
}
