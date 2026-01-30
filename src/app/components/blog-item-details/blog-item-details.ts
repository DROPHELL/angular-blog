import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { DataService, Post } from '../../services/data';
import { RatingComponent } from '../../shared/rating/rating';
import { CommentsComponent } from '../comments/comments';

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [
    CommonModule,
    RatingComponent,
    CommentsComponent   
  ],
  templateUrl: './blog-item-details.html',
  styleUrls: ['./blog-item-details.scss']
})
export class BlogItemDetailsComponent implements OnInit {

  post: Post | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) {
        this.loading = false;
        return;
      }

      this.dataService.getById(id).subscribe({
        next: data => {
          this.post = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    });
  }
}
