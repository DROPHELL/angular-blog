import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface BackendPost {
  _id: string;
  title: string;
  text: string;
  image?: string;
  authorLogin: string;
  createdAt: string;
  likes?: string[];
}

export interface Post {
  id: string;
  title: string;
  text: string;
  image: string;
  author: string;
  createdAt: string;

  likesCount: number;
  likedByUser: boolean;
}


export interface Comment {
  _id: string;
  postId: string;
  authorId: string;
  authorLogin: string;
  text: string;
  createdAt: string;
}

export interface BackendPaginatedPosts {
  posts: BackendPost[];
  total: number;
  page: number;
  pages: number;
}

export interface PaginatedPosts {
  posts: Post[];
  total: number;
  page: number;
  pages: number;
}

export interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
  postsCount: number;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private url = '/api';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.url}/user`);
  }

  updateUserProfile(data: {
    name: string;
    email: string;
  }): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.url}/user`, data);
  }

  getUserPosts(): Observable<Post[]> {
    return this.http
      .get<BackendPost[]>(`${this.url}/user/posts`)
      .pipe(map(posts => posts.map(p => this.mapPost(p))));
  }

  getAll(page = 1, limit = 5): Observable<PaginatedPosts> {
    return this.http
      .get<BackendPaginatedPosts>(
        `${this.url}/posts?page=${page}&limit=${limit}`
      )
      .pipe(
        map(res => ({
          page: res.page,
          pages: res.pages,
          total: res.total,
          posts: res.posts.map(p => this.mapPost(p)),
        }))
      );
  }

  getById(id: string): Observable<Post> {
    return this.http
      .get<BackendPost>(`${this.url}/posts/${id}`)
      .pipe(map(p => this.mapPost(p)));
  }

  addPost(post: {
    title: string;
    text: string;
    image?: string;
  }): Observable<Post> {
    return this.http
      .post<BackendPost>(`${this.url}/posts`, post)
      .pipe(map(p => this.mapPost(p)));
  }

  updatePost(id: string, post: Partial<Post>): Observable<Post> {
    return this.http
      .put<BackendPost>(`${this.url}/posts/${id}`, post)
      .pipe(map(p => this.mapPost(p)));
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/posts/${id}`);
  }

  likePost(id: string): Observable<{ likes: number }> {
    return this.http.post<{ likes: number }>(
      `${this.url}/posts/${id}/like`,
      {}
    );
  }

  unlikePost(id: string): Observable<{ likes: number }> {
    return this.http.delete<{ likes: number }>(
      `${this.url}/posts/${id}/like`
    );
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/comments/${postId}`);
  }

  addComment(postId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.url}/comments/${postId}`,
      { text }
    );
  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/comments/${commentId}`);
  }

  private mapPost(p: BackendPost): Post {
    const userId = localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')!.split('.')[1])).userId
      : null;

    return {
      id: p._id,
      title: p.title,
      text: p.text,
      image: p.image ?? '',
      author: p.authorLogin,
      createdAt: p.createdAt,
      likesCount: p.likes?.length ?? 0,
      likedByUser: userId ? p.likes?.includes(userId) ?? false : false,
    };
  }
}
