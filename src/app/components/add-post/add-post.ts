import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.html'
})
export class AddPostComponent implements OnInit {

  title = '';
  text = '';
  image = '';

  isEditMode = false;
  postId: string | null = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');

    if (this.postId) {
      this.isEditMode = true;

      this.dataService.getById(this.postId).subscribe(post => {
        this.title = post.title;
        this.text = post.text;
        this.image = post.image ?? '';
      });
    }
  }

  save(): void {
    const post = {
      title: this.title,
      text: this.text,
      image: this.image
    };

    if (this.isEditMode && this.postId) {
      this.dataService.updatePost(this.postId, post).subscribe(() => {
        this.router.navigate(['/blog']);
      });
    } else {
      this.dataService.addPost(post).subscribe(() => {
        this.router.navigate(['/blog']);
      });
    }
  }
}
