import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./components/blog-home/blog-home').then(m => m.BlogHomeComponent)
  },
  {
    path: 'blog/detail/:id',
    loadComponent: () =>
      import('./components/blog-item-details/blog-item-details').then(m => m.BlogItemDetailsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'blog/add',
    loadComponent: () =>
      import('./components/add-post/add-post').then(m => m.AddPostComponent),
    canActivate: [authGuard]
  },
  {
    path: 'blog/edit/:id',
    loadComponent: () =>
      import('./components/add-post/add-post').then(m => m.AddPostComponent),
    canActivate: [authGuard]
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./components/favorites/favorites').then(m => m.FavoritesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./components/user-profile/user-profile').then(m => m.UserProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup').then(m => m.SignupComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
