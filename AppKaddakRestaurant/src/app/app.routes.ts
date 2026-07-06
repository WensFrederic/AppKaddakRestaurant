<<<<<<< HEAD:src/app/app.routes.ts
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
  },  {
    path: 'homes',
    loadComponent: () => import('./homespages/homes/homes.page').then( m => m.HomesPage)
=======
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },  {
    path: 'loader',
    loadComponent: () => import('./loader/loader.page').then( m => m.LoaderPage)
>>>>>>> 686c17552ecf3729d79bf9010e2ab040000ac55b:AppKaddakRestaurant/src/app/app.routes.ts
  },
  {
    path: 'detalle-productos',
    loadComponent: () => import('./detallepages/detalle-productos/detalle-productos.page').then( m => m.DetalleProductosPage)
  },
  {
    path: 'carritos',
    loadComponent: () => import('./carritospages/carritos/carritos.page').then( m => m.CarritosPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkoutpages/checkout/checkout.page').then( m => m.CheckoutPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfilpages/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'admin-platos',
    loadComponent: () => import('./admin-platos/admin-platos.page').then( m => m.AdminPlatosPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },

<<<<<<< HEAD:src/app/app.routes.ts

];
=======
];
>>>>>>> 686c17552ecf3729d79bf9010e2ab040000ac55b:AppKaddakRestaurant/src/app/app.routes.ts
