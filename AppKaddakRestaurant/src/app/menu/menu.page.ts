import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonTabButton, IonLabel, IonIcon, IonSearchbar, IonTabBar, IonButton, IonBadge, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, cart, restaurant, receipt, person } from 'ionicons/icons';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

addIcons({ cartOutline, cart, restaurant, receipt, person });

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonContent, IonTabButton, IonLabel, IonIcon, IonSearchbar, IonTabBar, IonButton, IonBadge, CommonModule, FormsModule, RouterModule]
})
export class MenuPage implements OnInit {
  categorias: any[] = [];
  comidas: any[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.apiService.getCategorias().subscribe({
      next: (data) => {
        console.log("Categorias obtenidas:", data);
        this.categorias = data;
      },
      error: (err) => console.error('Error cargando categorias', err)
    });

    this.apiService.getComidas().subscribe({
      next: (data) => {
        console.log("Comidas obtenidas:", data);
        this.comidas = data;
      },
      error: (err) => console.error('Error cargando comidas', err)
    });
  }

  get cartItemsCount() {
    return this.cartService.getCartItems().reduce((acc, item) => acc + item.cantidad, 0);
  }

  async agregarAlCarrito(comida: any) {
    this.cartService.addToCart(comida);
    const toast = await this.toastController.create({
      message: `${comida.nombre_comida} agregado al pedido`,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}
