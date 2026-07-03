import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },  {
    path: 'loader',
    loadComponent: () => import('./loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'mipedido',
    loadComponent: () => import('./mipedido/mipedido.page').then( m => m.MipedidoPage)
  },
  {
    path: 'admin-platos',
    loadComponent: () => import('./admin-platos/admin-platos.page').then( m => m.AdminPlatosPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },

];
