import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonItem, IonLabel, IonButton, ToastController, IonIcon, IonTabBar, IonTabButton, IonSegment, IonSegmentButton, IonInput, LoadingController } from '@ionic/angular/standalone';
import { CartService } from '../services/cart.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-mipedido',
  templateUrl: './mipedido.page.html',
  styleUrls: ['./mipedido.page.scss'],
  standalone: true,
  imports: [IonContent, 
    IonItem,   
    IonLabel, 
    IonButton, 
    IonIcon, 
    IonTabBar, 
    IonTabButton, 
    IonSegment, 
    IonSegmentButton, 
    IonInput, CommonModule, FormsModule, RouterModule]
})
export class MipedidoPage implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  
  tipoEntrega: string = 'pickup';
  direccionEntrega: string = '';
  metodoPago: string = 'tarjeta';

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarCarrito();
  }

  ionViewWillEnter() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  vaciarCarrito() {
    this.cartService.clearCart();
    this.cargarCarrito();
  }

  async confirmarPedido() {
    if (this.cartItems.length === 0) return;

    if (this.tipoEntrega === 'delivery' && !this.direccionEntrega.trim()) {
      const toast = await this.toastController.create({
        message: 'Por favor, ingresa tu dirección para el delivery.',
        duration: 3000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    const detalles = this.cartItems.map(item => ({
      id_comida: item.id,
      cantidad: item.cantidad,
      precio_unitario: item.precio
    }));

    let estadoPago = 'pendiente';

    // Simulación de pago si es digital
    if (this.metodoPago !== 'efectivo') {
      const loading = await this.loadingController.create({
        message: 'Procesando pago seguro...',
        duration: 2500,
        spinner: 'bubbles'
      });
      await loading.present();
      await loading.onDidDismiss();
      estadoPago = 'pagado';
    }

    const orden: any = {
      id_cliente: localStorage.getItem('userId') || "user_test",
      tipo_orden: this.tipoEntrega,
      detalles: detalles,
      pago: {
        metodo_pago: this.metodoPago,
        estado_pago: estadoPago,
        monto: this.total
      }
    };

    if (this.tipoEntrega === 'delivery') {
      orden.delivery = {
        direccion_entrega: this.direccionEntrega,
        estado_delivery: 'pendiente'
      };
    }

    this.apiService.crearOrden(orden).subscribe({
      next: async (res) => {
        this.vaciarCarrito();
        const toast = await this.toastController.create({
          message: '¡Pedido enviado con éxito!',
          duration: 3000,
          color: 'success',
          position: 'top'
        });
        toast.present();
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Error al enviar el pedido.',
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        toast.present();
      }
    });
  }
}
