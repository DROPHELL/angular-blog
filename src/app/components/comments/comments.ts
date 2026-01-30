import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Comment } from '../../services/data';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.html',
})
export class CommentsComponent implements OnInit {

  @Input() postId!: string;

  comments: Comment[] = [];
  text = '';

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.dataService.getComments(this.postId).subscribe(data => {
      this.comments = data;
    });
  }

  add(): void {
    if (!this.text.trim()) return;

    this.dataService.addComment(this.postId, this.text).subscribe(() => {
      this.text = '';
      this.load();
    });
  }

  remove(id: string): void {
    if (!confirm('Usunąć komentarz?')) return;

    this.dataService.deleteComment(id).subscribe(() => {
      this.load();
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAuthor(authorLogin: string): boolean {
    return this.authService.currentUser?.login === authorLogin;
  }
}
