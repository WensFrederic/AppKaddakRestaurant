import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonItem, IonCardHeader, IonList, IonLabel, IonButton,  IonIcon, IonTabBar, IonTabButton, IonSegment, IonSegmentButton, IonInput, LoadingController} from '@ionic/angular/standalone';
//import { CartService } from '../services/cart.service';
//import { ApiService } from '../services/api.service';
import { AlertController,ToastController } from '@ionic/angular';
import { cartOutline, cart, restaurant, receipt, person, notificationsOutline, flame, add, home, clipboard, restaurantOutline, receiptOutline, personOutline, homeOutline, arrowBackOutline, remove, trashOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({cartOutline, cart, restaurant, receipt, person, homeOutline , remove });
import { CarritoService } from '../services/carritos.service';
import { Carrito } from '../models/carrito.model';
@Component({
  selector: 'app-mipedido',
  templateUrl: './mipedido.page.html',
  styleUrls: ['./mipedido.page.scss'],
  standalone: true,
  imports: [IonContent, 
    IonButton, 
    IonIcon, 
    CommonModule, FormsModule, RouterModule]
})
export class MipedidoPage implements OnInit {
 
   tipoPedido: string = 'mesa';
   numeroMesa: string ='07';

  carrito:Carrito[] = [] ;



 constructor(
    //private cartService: CartService,
   // private apiService: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private carritoService: CarritoService
  ) { 

    addIcons({arrowBackOutline,trashOutline,remove,add,
       homeOutline,restaurantOutline,receiptOutline,
       personOutline,notificationsOutline,cartOutline,
       home,flame,restaurant,clipboard,person,receipt}); 
  

}

  ngOnInit():void{
    this.cargarCarrito(); 
  }

  ionViewWillEnter() {
    
  }

  cargarCarrito(): void{
    this.carrito = this.carritoService.obtenerCarrito(); 
  }

  async vaciarCarrito(): Promise<void> {

  const alert = await this.alertController.create({

    header: 'Vaciar carrito',

    message: '¿Estás seguro de que deseas eliminar todos los productos del carrito?',

    buttons: [

      {
        text: 'Cancelar',
        role: 'cancel'
      },

      {
        text: 'Vaciar',
        role: 'destructive',

       handler: async () => {

  this.carritoService.vaciarCarrito();

  this.cargarCarrito();

  const toast = await this.toastController.create({

    message: 'El carrito fue vaciado correctamente.',

    duration: 2000,

    color: 'success',

    position: 'bottom'

  });

  await toast.present();
 
      }
        

      }

    ]

  });

  await alert.present();

}

seleccionarTipo(tipo: string): void {

  this.tipoPedido = tipo;

  console.log('Tipo de pedido:', this.tipoPedido);

}

async cambiarMesa(): Promise<void> {

  const alert = await this.alertController.create({

    header: 'Cambiar mesa',

    message: 'Ingrese el número de la mesa.',

    inputs: [

      {

        name: 'mesa',

        type: 'number',

        placeholder: 'Ejemplo: 08'

      }

    ],

    buttons: [

      {

        text: 'Cancelar',

        role: 'cancel'

      },

      {

        text: 'Guardar',

        handler: async (data) => {

          if (!data.mesa) {

            const toast = await this.toastController.create({

              message: 'Debe ingresar un número de mesa.',

              duration: 2000,

              color: 'warning'

            });

            await toast.present();

            return false;

          }

          this.numeroMesa = data.mesa;

          const toast = await this.toastController.create({

            message: 'Mesa actualizada correctamente.',

            duration: 2000,

            color: 'success'

          });

          await toast.present();

          return true;

        }

      }

    ]

  });

  await alert.present();

}
async confirmarPedido(): Promise<void> {

  if (this.carrito.length === 0) {

    const toast = await this.toastController.create({

      message: 'No hay productos en el carrito.',

      duration: 2000,

      color: 'warning',

      position: 'bottom'

    });

    await toast.present();

    return;

  }

  const pedido = {

    tipo: this.tipoPedido,

    mesa: this.numeroMesa,

    productos: this.carrito,

    fecha: new Date()

  };

  console.log('Pedido generado:', pedido);

  const alert = await this.alertController.create({

    header: 'Pedido confirmado',

    message: 'Tu pedido fue enviado correctamente al restaurante.',

    buttons: ['Aceptar']

  });

  await alert.present();

   this.carritoService.vaciarCarrito();
   this.cargarCarrito();
}


           // ELIMINAR PRODUCTO


eliminarProducto(id: string): void {

  this.carritoService.eliminarProducto(id);

  this.cargarCarrito();

}


           //AUMENTAR CANTIDAD


aumentarCantidad(id: string): void {

  this.carritoService.aumentarCantidad(id);

  this.cargarCarrito();

}


//  DISMINUIR CANTIDAD
 disminuirCantidad(id: string): void {

  this.carritoService.disminuirCantidad(id);

  this.cargarCarrito();

}

get subtotal(): number {

  return this.carritoService.calcularSubtotal();

}

get total(): number {

  return this.carritoService.calcularTotal();

}

}
  