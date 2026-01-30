import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingService } from '../../services/rating';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.html',
  styleUrls: ['./rating.scss']
})
export class RatingComponent implements OnInit {

  @Input() postId!: string;
  @Input() readonly: boolean = false;

  stars = [1, 2, 3, 4, 5];
  hoverRating = 0;
  currentRating = 0;
  votesCount = 0;

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.updateData();
  }

  onStarHover(star: number): void {
    if (!this.readonly) {
      this.hoverRating = star;
    }
  }

  onStarLeave(): void {
    this.hoverRating = 0;
  }

  onStarClick(star: number): void {
    if (this.readonly) return;

    this.ratingService.addRating(this.postId, star);
    this.updateData();
  }

  private updateData(): void {
    this.currentRating = this.ratingService.getAverage(this.postId);
    this.votesCount = this.ratingService.getCount(this.postId);
  }
}
