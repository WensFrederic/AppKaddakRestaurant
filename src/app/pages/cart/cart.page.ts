import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Mwen ajoute enpòtasyon ki nesesè yo
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonSegment, 
  IonSegmentButton, 
  IonList, 
  IonItem, 
  IonThumbnail, 
  IonLabel, 
  IonButton, 
  IonNote 
} from '@ionic/angular/standalone';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  // Mwen ajoute tout eleman Ionic sa yo nan 'imports'
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonButtons, 
    IonBackButton, 
    IonSegment, 
    IonSegmentButton, 
    IonList, 
    IonItem, 
    IonThumbnail, 
    IonLabel, 
    IonButton, 
    IonNote
  ]
})
export class CartPage implements OnInit {
  
  // Lista de productos en el carrito
  cartItems: any[] = [];
  subtotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Obtenemos los productos del servicio
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  // Calcular el total de la compra
  calculateTotal() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  // Función para actualizar cantidad (Lógica pendiente)
  updateQuantity(item: any, change: number) {
    console.log('Actualizando cantidad:', item.name, change);
  }
}
