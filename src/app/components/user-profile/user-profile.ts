import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, UserProfile, Post } from '../../services/data';
import { BlogItemComponent } from '../blog-item/blog-item';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogItemComponent],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfileComponent implements OnInit {

  user!: UserProfile;
  userPosts: Post[] = [];

  isEditing = false;
  newName = '';
  newEmail = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUserProfile().subscribe(data => {
      this.user = data;
      this.newName = data.name;
      this.newEmail = data.email;
    });

    this.dataService.getUserPosts().subscribe(posts => {
      this.userPosts = posts;
    });
  }

  editProfile(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  updateProfile(): void {
    this.dataService.updateUserProfile({
      name: this.newName,
      email: this.newEmail
    }).subscribe(updated => {
      this.user.name = updated.name;
      this.user.email = updated.email;
      this.isEditing = false;
    });
  }
}
