import { ForgetpasswordComponent } from './shared/components/forgetpassword/forgetpassword.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate:[logedGuard],
    children: [
      {
        path: 'login',
        title: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'forget',
        title: 'forget',
        loadComponent: () =>
          import('././shared/components/forgetpassword/forgetpassword.component').then(
            (m) => m.ForgetpasswordComponent
          ),
      },
      {
        path: 'register',
        title: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate:[authGuard],
    children: [
      {
        path: 'home',
        title: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'brands',
        title: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then((m) => m.BrandsComponent),
      },
      {
        path: 'cart',
        title: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'wishlist',
        title: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then((m) => m.WishlistComponent),
      },
      {
        path: 'allorders',
        title: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then((m) => m.AllordersComponent),
      },
      {
        path: 'categories',
        title: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'products',
        title: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'checkout/:id',
        title: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
      },
      {
        path: 'details/:id',
        title: 'details',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (m) => m.DetailsComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then(
            (m) => m.NotfoundComponent
          ),
      },
    ],
  },
];
